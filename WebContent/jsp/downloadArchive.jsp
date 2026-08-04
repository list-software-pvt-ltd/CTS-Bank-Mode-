<%@page import="java.io.*"%>
<%@page import="java.util.*"%>
<%@page import="java.util.zip.*"%>
<%@page import="java.sql.*"%>
<%@page import="cts.*"%>


<%!

public void zipFile(File file, String basePath, ZipOutputStream zos, byte[] buffer) throws Exception
{
    FileInputStream fis = null;

    try
    {
        String zipEntryName =
            file.getAbsolutePath().substring(basePath.length());


        if(zipEntryName.startsWith("\\")
           || zipEntryName.startsWith("/"))
        {
            zipEntryName = zipEntryName.substring(1);
        }


        zipEntryName = zipEntryName.replace("\\", "/");


        if(file.isDirectory())
        {
            File[] children = file.listFiles();

            if(children != null)
            {
                for(File child : children)
                {
                    zipFile(child, basePath, zos, buffer);
                }
            }

            return;
        }


        fis = new FileInputStream(file);


        System.out.println("ZIP ENTRY = " + zipEntryName);


        zos.putNextEntry(new ZipEntry(zipEntryName));


        int len;

        while((len = fis.read(buffer)) > 0)
        {
            zos.write(buffer,0,len);
        }


        zos.closeEntry();

    }
    finally
    {
        if(fis != null)
            fis.close();
    }
}



public boolean deleteFolder(File file)
{
    if(file.isDirectory())
    {
        File[] children = file.listFiles();

        if(children != null)
        {
            for(File child : children)
            {
                deleteFolder(child);
            }
        }
    }

    return file.delete();
}

%>



<%

Connection cn = null;
ZipOutputStream zos = null;


File zipFile = null;


try
{

    cn = Configuration.getConnection();


    String archivePath =
        Configuration.getConfValByNm("CFG_ARCUPLOADPATH_TO_CHI", cn);



    String[] folders =
        request.getParameterValues("folders");



    if(folders == null || folders.length == 0)
    {
        out.println("No folders selected");
        return;
    }



    String tempZipPath =
        System.getProperty("java.io.tmpdir")
        + File.separator
        + "archive_backup.zip";



    zipFile = new File(tempZipPath);



    zos =
        new ZipOutputStream(
            new FileOutputStream(zipFile)
        );



    byte[] buffer =
        new byte[1024 * 1024];



    List<File> foldersToDelete =
        new ArrayList<File>();



    boolean hasData = false;



    for(String folderName : folders)
    {

        File folder =
            new File(archivePath, folderName);



        System.out.println(
            "Processing : "
            + folder.getAbsolutePath()
        );



        if(!folder.exists())
        {
            continue;
        }



        zipFile(
            folder,
            archivePath,
            zos,
            buffer
        );



        foldersToDelete.add(folder);



        hasData = true;

    }



    zos.finish();

    zos.close();

    zos = null;




    if(!hasData)
    {
        out.println("ZIP EMPTY");
        return;
    }



    // ==============================
    // SEND ZIP TO BROWSER
    // ==============================


    response.reset();


    response.setContentType("application/zip");


    response.setHeader(
        "Content-Disposition",
        "attachment; filename=archive_backup.zip"
    );

    response.setHeader(
    	    "Set-Cookie",
    	    "downloadComplete=true; path=/"
    	);
    response.setContentLengthLong(
        zipFile.length()
    );



    FileInputStream fis =
        new FileInputStream(zipFile);



    OutputStream os =
        response.getOutputStream();



    int bytesRead;



    while(
        (bytesRead = fis.read(buffer)) > 0
    )
    {
        os.write(buffer,0,bytesRead);
    }



    os.flush();


    fis.close();


    os.close();



    // ==============================
    // DELETE ORIGINAL FOLDERS
    // ==============================


    for(File folder : foldersToDelete)
    {

        boolean deleted =
            deleteFolder(folder);


        System.out.println(
            "Folder Deleted : "
            + folder.getAbsolutePath()
            + " = "
            + deleted
        );

    }



    // delete temporary zip

    zipFile.delete();



}
catch(Exception e)
{
    e.printStackTrace();
}



finally
{

    try
    {
        if(zos != null)
            zos.close();

    }
    catch(Exception e){}


    try
    {
        if(cn != null)
            cn.close();

    }
    catch(Exception e){}

}

%>