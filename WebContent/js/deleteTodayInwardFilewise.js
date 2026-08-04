/**
 * deleteTodayInwardFilewise.js
 * Handles Fetch + Select + Delete for "Delete Today Clearing Inward (File-wise)" page.
 *
 * Backend endpoint: jsp/deleteTodayInwardFilewise.jsp
 *   ?whattodo=F  → fetch today's records
 *   ?whattodo=D  → delete selected rows + wipe ClearingInward folder
 */

$(document).ready(function () {

    var urlbase = (function () {
        var u = document.URL;
        return u.substr(0, u.lastIndexOf('/') + 1);
    })();

    // ── Display today's date ────────────────────────────────────────────────
    var todayDDMMYYYY = getTodayDDMMYYYY();
    var todayDisplay  = todayDDMMYYYY.substr(0,2) + '-'
                      + todayDDMMYYYY.substr(2,2) + '-'
                      + todayDDMMYYYY.substr(4);
    $('#todayDateDisplay').val(todayDisplay);

    // ── Show onload message if any ──────────────────────────────────────────
    var onloadMsg = $('#onloadMsg').val();
    if (onloadMsg && onloadMsg.length > 0 && onloadMsg !== 'null' && onloadMsg !== 'N') {
        alert(onloadMsg === 'SUCCESS' ? 'Records deleted successfully!' : 'Error: ' + onloadMsg);
    }

    // ── Fetch button ────────────────────────────────────────────────────────
    $('#btnFetchToday').click(function () {
        fetchTodayFiles();
    });

    // ── Select-all checkbox ─────────────────────────────────────────────────
    $(document).on('change', '#chkSelectAll', function () {
        $('#tbodyFilewise input[type=checkbox]').prop('checked', $(this).is(':checked'));
        updateSummary();
        toggleDeleteBtn();
    });

    // ── Row checkbox ────────────────────────────────────────────────────────
    $(document).on('change', '#tbodyFilewise input[type=checkbox]', function () {
        var total    = $('#tbodyFilewise input[type=checkbox]').length;
        var selected = $('#tbodyFilewise input[type=checkbox]:checked').length;
        $('#chkSelectAll').prop('checked', total > 0 && total === selected);
        updateSummary();
        toggleDeleteBtn();
    });

    // ── Delete button ───────────────────────────────────────────────────────
    $('#btnDelete').click(function () {
        var selectedClrSrNos = getSelectedClrSrNos();
        if (selectedClrSrNos.length === 0) {
            alert('Please select at least one record to delete.');
            return;
        }
        if (!confirm('Are you sure you want to permanently delete the selected '
                + selectedClrSrNos.length + ' record(s)?\n\nThis will also clear the entire ClearingInward folder.')) {
            return;
        }

        showWait(true);

        $.ajax({
            url      : urlbase + 'deleteTodayInwardFilewise_backend.jsp',
            type     : 'POST',
            data     : {
                whattodo  : 'D',
                clrSrNos  : selectedClrSrNos.join(','),
                todayDate : todayDDMMYYYY,
                loginby   : $('#session_loginid').val()
            },
            dataType : 'json',
            success  : function (response) {
                showWait(false);
                if (response.RESPCODE === 0) {
                    var msg = 'Records deleted successfully!\n' +
                              '  CLEARINGINWARD rows deleted         : ' + response.DELETED + '\n' +
                              '  CLEARINGINWARD_HISTORY rows deleted : ' + response.DELETED_HIST + '\n' +
                              '  ClearingInward folder items removed : ' + response.FOLDER_ITEMS_REMOVED;
                    if (response.FILES_FAILED > 0) {
                        msg += '\n  Folder clean FAILED: ' + response.FOLDER_CLEAN_STATUS;
                    }
                    alert(msg);
                    fetchTodayFiles();
                } else {
                    alert('Deletion failed: ' + (response.RETVAL || 'Unknown error'));
                }
            },
            error    : function () {
                showWait(false);
                alert('Error calling delete service. Please try again.');
            }
        });
    });

    // ── Auto-fetch on page load ─────────────────────────────────────────────
    fetchTodayFiles();

    // ═══════════════════════════════════════════════════════════════════════
    //  GRID DATA + SORT
    // ═══════════════════════════════════════════════════════════════════════

    var _gridData = [];   // current sorted copy (not original)
    var _sortAsc  = true; // current sort direction

    function fetchTodayFiles() {
        showWait(true);
        resetGrid();

        $.ajax({
            url      : urlbase + 'deleteTodayInwardFilewise_backend.jsp',
            type     : 'GET',
            data     : {
                whattodo  : 'F',
                todayDate : todayDDMMYYYY
            },
            dataType : 'json',
            success  : function (response) {
                showWait(false);
                if (!response || response.RESPCODE === 1) {
                    $('#noDataMsg').show();
                    return;
                }
                if (!response.DATA || response.DATA.length === 0) {
                    $('#noDataMsg').show();
                    return;
                }
                // Initial load: ascending by entry date (matches DB ORDER BY)
                _gridData = response.DATA;
                _sortAsc  = true;
                _renderGrid(_gridData);
                _updateSortArrow();
            },
            error    : function () {
                showWait(false);
                alert('Error fetching today\'s clearing inward records.');
            }
        });
    }

    // ── Fix 2: sort toggles correctly — _gridData always holds current view ──
    $(document).on('click', '#thEntryDate', function () {
        if (_gridData.length === 0) return;
        _sortAsc = !_sortAsc;
        var dir = _sortAsc ? 1 : -1;
        // Sort a copy, then replace _gridData so next click reverses correctly
        _gridData = _gridData.slice().sort(function (a, b) {
            var da = a.CLI_ENTRYDATE || '';
            var db = b.CLI_ENTRYDATE || '';
            // "YYYY-MM-DD HH:MI" strings sort lexicographically — works correctly
            if (da < db) return -1 * dir;
            if (da > db) return  1 * dir;
            return 0;
        });
        _renderGrid(_gridData);
        _updateSortArrow();
    });

    function _updateSortArrow() {
        $('#thEntryDate').html('Entry Date&nbsp;<span id="sortArrow">'
            + (_sortAsc ? '&#9650;' : '&#9660;') + '</span>');
    }

    /**
     * Render rows from data array.
     * CLI_AMOUNT  : already in Rupees (Oracle TO_CHAR divided by 100)
     * CLI_CONTI_CYCNO : cycle number from the correct column  ← Fix 1
     */
    function _renderGrid(data) {
        var tbody = $('#tbodyFilewise');
        tbody.empty();
        $('#chkSelectAll').prop('checked', false);
        $('#noDataMsg').hide();

        $.each(data, function (i, row) {
            var amtRaw = (row.CLI_AMOUNT != null)
                ? row.CLI_AMOUNT.toString().replace(/,/g, '') : '0';

            var tr = '<tr>' +
                '<td><input type="checkbox" class="rowChk" ' +
                    'data-clrsrno="' + escHtml(row.CLI_CLRSRNO) + '" ' +
                    'data-amount="'  + escHtml(amtRaw)           + '" /></td>' +
                '<td>'  + escHtml(row.CLI_SERIALNO)                          + '</td>' +
                '<td style="text-align:right;">' + formatAmount(amtRaw)      + '</td>' +
                '<td class="left">' + escHtml(row.CLI_XMLFILENAME)           + '</td>' +
                '<td>'  + formatDate(row.CLI_ENTRYDATE)                      + '</td>' +
                '<td style="text-align:center;">' + escHtml(row.CLI_CONTI_CYCNO) + '</td>' +
                '<td style="text-align:center;">' + escHtml(row.CLI_CLEARINGTYPE) + '</td>' +
                '</tr>';
            tbody.append(tr);
        });

        updateSummary();
        toggleDeleteBtn();
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  HELPERS
    // ═══════════════════════════════════════════════════════════════════════

    function resetGrid() {
        _gridData = [];
        _sortAsc  = true;
        $('#tbodyFilewise').empty();
        $('#chkSelectAll').prop('checked', false);
        $('#selCount').val('0');
        $('#selAmount').val('0.00');
        $('#btnDelete').prop('disabled', true);
        $('#noDataMsg').hide();
        $('#thEntryDate').html('Entry Date&nbsp;<span id="sortArrow">&#9650;</span>');
    }

    function updateSummary() {
        var count = 0, amount = 0;
        $('#tbodyFilewise input.rowChk:checked').each(function () {
            count++;
            amount += parseFloat($(this).data('amount')) || 0;
        });
        $('#selCount').val(count);
        $('#selAmount').val(amount.toFixed(2));
    }

    function toggleDeleteBtn() {
        $('#btnDelete').prop('disabled',
            $('#tbodyFilewise input.rowChk:checked').length === 0);
    }

    function getSelectedClrSrNos() {
        var nos = [];
        $('#tbodyFilewise input.rowChk:checked').each(function () {
            nos.push($(this).data('clrsrno'));
        });
        return nos;
    }

    function getTodayDDMMYYYY() {
        var d  = new Date();
        var dd = ('0' + d.getDate()).slice(-2);
        var mm = ('0' + (d.getMonth() + 1)).slice(-2);
        return dd + mm + d.getFullYear();
    }

    function escHtml(val) {
        if (val == null) return '';
        return String(val)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function formatAmount(val) {
        if (val == null || val === '') return '';
        var n = parseFloat(val);
        if (isNaN(n)) return val;
        return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function formatDate(val) {
        if (!val) return '';
        var m = String(val).match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}:\d{2})/);
        if (m) return m[3] + '-' + m[2] + '-' + m[1] + ' ' + m[4];
        return val;
    }

    function showWait(show) {
        document.getElementById('waitDiv').style.display = show ? '' : 'none';
    }

});