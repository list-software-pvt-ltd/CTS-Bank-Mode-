#include <windows.h>
#include<iostream.h>
#include <tchar.h>
#include <wincrypt.h>
#include "jni_md.h"
#include<conio.h>
#include<stdio.h>
#pragma comment(lib, "Crypt32.lib")

#define MY_ENCODING_TYPE  (PKCS_7_ASN_ENCODING | X509_ASN_ENCODING)
//#define SIGNER_NAME L"Insert_signer_name_here"

#define SIGNER_NAME L"SANJEEV_VINAYAK_KULKARNI"

#define CERT_STORE_NAME  L"MY"
#define szOID_RSA_SHA256RSA		"1.2.840.113549.1.1.11"
//Local function prototypes.

#include "cts_listwrap.h"

bool SetupSSL();
void MyHandleError(LPTSTR psz);
bool SignMessage(CRYPT_DATA_BLOB *pSignedMessageBlob);

PCCERT_CONTEXT obj;
HCERTSTORE store;
const char *toBeSignedString;
BYTE* signedData;
jbyteArray  returnSignedData;
char *buf;
char *signedDataStr;


JNIEXPORT jstring JNICALL Java_cts_listwrap_signdata(JNIEnv *env, jclass cls, jstring parameter)
{
	toBeSignedString =env->GetStringUTFChars(parameter, JNI_FALSE);
	SetupSSL();
	std::string str(reinterpret_cast<const char*>(signedDataStr));
	jstring jstrBuf = env->NewStringUTF(str.c_str());
	return jstrBuf;
}//end first
void main()
{
	cout<<"******11*****";
	toBeSignedString="abhishek";
	SetupSSL();
	cout<<"******22*****";
}
bool SetupSSL()
{
	cout<<"1111111\n";
	LPWSTR pswzFirstCert = L"Insert_cert_subject_name1";
    store = CertOpenSystemStore(NULL,"MY");
    DWORD ret = 0;
    bool ok = false;

    if(store==NULL)
        return false;
	cout<<"store="<<store<<"\n";
    //PCCERT_CONTEXT context = CertFindCertificateInStore(store,X509_ASN_ENCODING,0,CERT_FIND_KEY_IDENTIFIER,L"3a35563a813c033745a54a1fcb81af7245cb7cc5",NULL);
	//PCCERT_CONTEXT context = CertFindCertificateInStore(store,X509_ASN_ENCODING,0,CERT_FIND_MD5_HASH,L"67:ED:D7:3E:50:B3:D0:E6:F5:BE:CA:49:72:DE:B4:E2",NULL);
	//PCCERT_CONTEXT context = CertFindCertificateInStore(store,X509_ASN_ENCODING,0,CERT_FIND_MD5_HASH,L"3257BF8F8B3E13C5A6591B84A8DD1F84",NULL);
	//PCCERT_CONTEXT context = CertFindCertificateInStore(store,X509_ASN_ENCODING,0,CERT_FIND_MD5_HASH,L"4858BA45B49EE8ACE04E81C08DAE778C",NULL);
	//PCCERT_CONTEXT context = CertFindCertificateInStore(store,X509_ASN_ENCODING,0,CERT_FIND_ANY,NULL,NULL);
	//PCCERT_CONTEXT context = CertFindCertificateInStore(store,X509_ASN_ENCODING,0,CERT_FIND_CERT_ID,L"69E1E527AB169B65445A1A8D88CC473639455964766D61653B8AE1352EE3CBB1",NULL);
	//PCCERT_CONTEXT context = CertFindCertificateInStore(store,X509_ASN_ENCODING,0,CERT_FIND_HAS_PRIVATE_KEY,NULL,NULL);
	//PCCERT_CONTEXT context = CertFindCertificateInStore(store,X509_ASN_ENCODING,0,CERT_FIND_ISSUER_ATTR,L"CN=e-Mudhra Sub CA for Class 2 Individual 2011",NULL);
	//PCCERT_CONTEXT context = CertFindCertificateInStore(store,X509_ASN_ENCODING,0,CERT_FIND_ISSUER_NAME,L"e-Mudhra Sub CA for Class 2 Individual 2011",NULL);
	//PCCERT_CONTEXT context = CertFindCertificateInStore(store,X509_ASN_ENCODING,0,CERT_FIND_ISSUER_STR,L"(n)Code Solutions CA 2011-1",NULL);
	PCCERT_CONTEXT context = CertFindCertificateInStore(store,X509_ASN_ENCODING,0,CERT_FIND_ISSUER_STR,L"e-Mudhra Class 2 Gold Individual SubCA",NULL);
	//PCCERT_CONTEXT context = CertFindCertificateInStore(store,X509_ASN_ENCODING,0,CERT_FIND_ISSUER_STR,L"(n)Code Solutions CA 2011-1",NULL);
	/*char *s1="e-Mudhra Sub CA for Class 2 Individual 2011";
	wchar_t *s2=(wchar_t *)s1;
	const wchar_t *str=(wchar_t*)s1;
	//void *str3=(void*)str;
	PCCERT_CONTEXT context = CertFindCertificateInStore(store,X509_ASN_ENCODING,0,CERT_FIND_ISSUER_STR,str,NULL);*/
	//cout<<"context:\n"<<(context+0)->pCertInfo->SerialNumber;
	//cout<<"context:\n"<<(context+1)->pCertInfo->SerialNumber;

	//BYTE* str1 =(context+1)->pCertInfo->SerialNumber.pbData;
	//std::string str2((char *)str1);
	//cout<<"SerialNumber:"<<str2;
	//int i=0;

	//cout<<"\n\ncontext[0]\n\n"<<context[0].pCertInfo;
	//cout<<"\n\ncontext[0]\n\n"<<context[0].dwCertEncodingType;
	//cout<<"\n***************************\n";
	//cout<<"\n\ncontext[0]\n\n"<<context[1].pCertInfo;
	//cout<<"\n\ncontext[0]"<<context[1].dwCertEncodingType;

	//cout<<"context[1]\n"<<(int)context[1];

	cout<<"\n$$$$$$\n"<<context;
	if(context==NULL)
	{
		cout<<"\ncontext is null";
	}
    if(context!=NULL)
    {
		cout<<"22222\n";
		obj=context;
		CRYPT_DATA_BLOB pSignedMessageBlob;
		if(SignMessage(&pSignedMessageBlob))
		{
			//cout<<"Message signed. ...........";
		}
        //ok = InternetSetOption(request,INTERNET_OPTION_CLIENT_CERT_CONTEXT,(LPVOID)context,sizeof(CERT_CONTEXT))==TRUE;
		//ok = InternetSetOption(request,NULL,(LPVOID)context,sizeof(CERT_CONTEXT))==TRUE;
        /*if(!ok)
		{
			cout<<"3333\n";
            ret = GetLastError();
			CertFreeCertificateContext(context);
		}*/

		cout<<"44444\n";
    }
    //MessageBoxA(0, "1", 0, 0);
    CertCloseStore(store,0);
    return ok;
};

bool SignMessage(CRYPT_DATA_BLOB *pSignedMessageBlob)
{

	cout<<"---- inside SignMessage() -------";
    bool fReturn = false;
    BYTE* pbMessage;
	BYTE* pbMessage1;
	DWORD cbMessage1;
	DWORD cbMessage;
    HCERTSTORE hCertStore = store;
    PCCERT_CONTEXT pSignerCert=obj;
    CRYPT_SIGN_MESSAGE_PARA  SigParams;
    //DWORD *cbSignedMessageBlob=NULL;
	DWORD cbSignedMessageBlob;
    BYTE  *pbSignedMessageBlob = NULL;

    // Initialize the output pointer.
    pSignedMessageBlob->cbData = 0;
    pSignedMessageBlob->pbData = NULL;

    // The message to be signed.
    // Usually, the message exists somewhere and a pointer is
    // passed to the application.

    //pbMessage =(BYTE*)TEXT("CryptoAPI is a good way to handle security");
	pbMessage =(BYTE*)TEXT(toBeSignedString);
	//pbMessage1 =(BYTE*)TEXT("ABHISHEK PATIL ABHISHEK PATIL");

	//pbMessage =(BYTE*)TEXT(str1);
	//pbMessage1 =(BYTE*)TEXT("CryptoAPI is a good way to handle security");
	cout<<"\n\n*******************pbMessage::"<<pbMessage<<"\n\n";
    // Calculate the size of message. To include the
    // terminating null character, the length is one more byte
    // than the length returned by the strlen function.
	//const BYTE* MessageArray[] = {pbMessage,pbMessage1};
	const BYTE* MessageArray[] = {pbMessage};
    cbMessage = (lstrlen((TCHAR*) pbMessage) + 1) * sizeof(TCHAR);
	//cbMessage1 = (lstrlen((TCHAR*) pbMessage1) + 1) * sizeof(TCHAR);
	cout<<"\n\n*******cbMessage::"<<cbMessage<<"\n\n";
    // Create the MessageArray and the MessageSizeArray.
    //MessageArray contains all messages that to be signed
	//cout<<"\n\n*******MessageArray::"<<MessageArray[0]<<"\n\n";

    DWORD_PTR MessageSizeArray[1];//array that hold multiple messages size
    MessageSizeArray[0] = cbMessage;//message 1 size
 	//MessageSizeArray[1] = cbMessage1;//message1 2 size

	//MessageSizeArray[1] = cbMessage;
    //  Begin processing.
     _tprintf(TEXT("The message to be signed is \"%s\".\n"),pbMessage);

    // Open the certificate store.
    /*if (!( hCertStore = CertOpenStore(CERT_STORE_PROV_SYSTEM,0,NULL,CERT_SYSTEM_STORE_CURRENT_USER,CERT_STORE_NAME)))
    {
         MyHandleError(TEXT("The MY store could not be opened."));
       //  goto exit_SignMessage;
    }*/

    // Get a pointer to the signer's certificate.
    // This certificate must have access to the signer's private key.
    //if(pSignerCert = CertFindCertificateInStore(hCertStore, MY_ENCODING_TYPE,0,CERT_FIND_SUBJECT_STR,SIGNER_NAME,NULL))
	//if(pSignerCert = CertFindCertificateInStore(hCertStore, MY_ENCODING_TYPE,0,NULL,SIGNER_NAME,NULL))
	/*if(pSignerCert = CertFindCertificateInStore(hCertStore, MY_ENCODING_TYPE,0,CERT_FIND_SUBJECT_CERT,SIGNER_NAME,NULL))
    {
       MyHandleError(TEXT("The signer's certificate was found.\n"));
	   //cout<<"The signer's certificate was found.\n";
    }
    else
    {
        MyHandleError(TEXT("Signer certificate not found."));

    }*/
    SigParams.cbSize = sizeof(CRYPT_SIGN_MESSAGE_PARA);
    SigParams.dwMsgEncodingType = MY_ENCODING_TYPE;
    SigParams.pSigningCert = pSignerCert;
    SigParams.HashAlgorithm.pszObjId = szOID_RSA_SHA256RSA;
    SigParams.HashAlgorithm.Parameters.cbData = NULL;
    SigParams.cMsgCert = 1;
    SigParams.rgpMsgCert = &pSignerCert;
    SigParams.cAuthAttr = 0;
    SigParams.dwInnerContentType = 0;
    SigParams.cMsgCrl = 0;
    SigParams.cUnauthAttr = 0;
    SigParams.dwFlags = 0;
    SigParams.pvHashAuxInfo = NULL;
    SigParams.rgAuthAttr = NULL;

    // First, get the size of the signed BLOB.
    if(CryptSignMessage(&SigParams,false,1,MessageArray, MessageSizeArray,NULL,&cbSignedMessageBlob))
    {
		 _tprintf(TEXT("The message to be signed is \"%d\".\n\n"),cbSignedMessageBlob);
    }
    else
    {
        MyHandleError(TEXT("Getting signed BLOB size failed\n\n"));
        //goto exit_SignMessage;
    }

	//cbSignedMessageBlob=cbMessage;
	//cbSignedMessageBlob=(DWORD*)malloc(sizeof(DWORD)*1);
	//*cbSignedMessageBlob=cbMessage;
	//pbSignedMessageBlob=(BYTE*)malloc(*(cbSignedMessageBlob+0));
	pbSignedMessageBlob=(BYTE*)malloc(cbSignedMessageBlob);
	//cbSignedMessageBlob=cbMessage;
	cout<<"************\n";
	cout<<sizeof(pbSignedMessageBlob);
	cout<<"\n************\n";
    // Allocate memory for the signed BLOB.
    /*&if(!(sizeof(pbSignedMessageBlob)>0))
    {
        MyHandleError(TEXT("\n\nMemory allocation error while signing.\n\n"));
    }
	else
	{
		  MyHandleError(TEXT("\n\nMemory allocation successful.\n\n"));
	}*/

    // Get the signed message BLOB.
	cout<<"\n&SigParams="<<&SigParams;
	cout<<"\nMessageArray[0]"<<MessageArray[0]<<"\n";
	/*
	BOOL WINAPI CryptSignMessage( _In_     PCRYPT_SIGN_MESSAGE_PARA pSignPara,
  _In_     BOOL fDetachedSignature,
  _In_     DWORD cToBeSigned,
  _In_     const BYTE *rgpbToBeSigned[],
  _In_     DWORD rgcbToBeSigned[],
  _Out_    BYTE *pbSignedBlob,
  _Inout_  DWORD *pcbSignedBlob
);
	*///PCRYPT_SIGN_MESSAGE_PARA

	/*
	pbSignedMessageBlob:
	    Pointer that will hold the address of the buffer holding the
        signed and encoded message.

	cbSignedMessageBlob:
		The length of the signed and encoded message.
        DWORD cbEncodedBlob;
	*/

	 signedData=new BYTE[cbSignedMessageBlob];
   //if(CryptSignMessage(&SigParams,true,1,MessageArray,MessageSizeArray,pbSignedMessageBlob,cbSignedMessageBlob))
   if(CryptSignMessage(&SigParams,true,2,MessageArray,MessageSizeArray,pbSignedMessageBlob,&cbSignedMessageBlob))
    {
        MyHandleError(TEXT("\n\n\tThe message was signed successfully.\n\n"));
		int i;
		//byte b[cbSignedMessageBlob];
		int arr1;
		int arr2;

		arr1=MessageSizeArray[0];
		arr2=MessageSizeArray[1];
		for(i=0;i<cbSignedMessageBlob;i++)
		{
			/*if(i<=arr1)
			{
				cout<<pbSignedMessageBlob[i];
			}
			else
			{
				cout<<pbSignedMessageBlob[i];
			}*/
			signedData[i]=pbSignedMessageBlob[i];
		}

		buf = (char*)malloc(cbSignedMessageBlob);
		signedDataStr=(char*)signedData;
		//for(i=0;i<cbSignedMessageBlob;i++)
		{
			//cout<<signedDataStr[i];
		}
        fReturn = true;
    }
    else
    {
        MyHandleError(TEXT("\n\n\tError getting signed BLOB\n\n"));
    }


	//for(i=0;i<2;i++)
	{
		cout<<"Size of array:"<<sizeof(signedDataStr);
		//cout<<"\npbSignedMessageBlob::"<<pbSignedMessageBlob;
		//cout<<"\npbSignedMessageBlob::"<<*pbSignedMessageBlob;
		//cout<<"\ncbSignedMessageBlob::"<<cbSignedMessageBlob;
	}
	return fReturn;
};//end function

void MyHandleError(LPTSTR psz)
{
    _ftprintf(stderr, TEXT("An error occurred in the program. \n"));
    _ftprintf(stderr, TEXT("%s\n"), psz);
    _ftprintf(stderr, TEXT("Error number %x.\n"), GetLastError());
    _ftprintf(stderr, TEXT("Program terminating. \n"));
} // End of MyHandleError
