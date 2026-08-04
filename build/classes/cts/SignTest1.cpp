/--------------------------------------------------------------------
// Copyright (C) Microsoft.  All rights reserved.
// Example of signing a hash and 
// verifying the hash signature.
#pragma comment(lib, "crypt32.lib")

#include <stdio.h>
#include <windows.h>
#include <Wincrypt.h>
#define MY_ENCODING_TYPE  (PKCS_7_ASN_ENCODING | X509_ASN_ENCODING)
void main(void)
{
//-------------------------------------------------------------------
// Declare and initialize variables.

/*
	HCRYPTPROV:
	The HCRYPTPROV data type is used to represent handles to CSPs.
	These handles are used to indicate which CSP module performs specific operations.
*/
	HCRYPTPROV hProv;
	BYTE *pbBuffer= (BYTE *)"The data that is to be hashed and signed.";
	DWORD dwBufferLen = strlen((char *)pbBuffer)+1;
	HCRYPTHASH hHash;
	HCRYPTKEY hKey;
	HCRYPTKEY hPubKey;
	BYTE *pbKeyBlob;        
	BYTE *pbSignature;
	DWORD dwSigLen;
	DWORD dwBlobLen;

//-------------------------------------------------------------------
// Acquire a cryptographic provider context handle.

	if(CryptAcquireContext(&hProv,NULL,NULL,PROV_RSA_FULL,0)) 
	{
		 cout<<"\tCSP context acquired.\n";
	}
	else
	{
		 cout<<"\tError during CryptAcquireContext.";
	}

}//end main