package cts;
public class ImageBean
{
			private String fileName;
			private String ImageDataOffset;
			private String ImageDataLength;
			private String DigitalSignatureDataOffset;
			private String DigitalSignatureLength;
			private String DigitalSignatureMethod;
			private String SecurityKeySize;
			private String ViewSideIndicator;
			private String ViewFormat;
			private String imageFile;
			private String imageCompressionType;
			public ImageBean()
			{}
			 //constructor ImageBean(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String)
			public ImageBean(String imageFile,String fileName,String ImageDataOffset,String ImageDataLength,String DigitalSignatureDataOffset,String DigitalSignatureLength,String DigitalSignatureMethod,String SecurityKeySize,String ViewSideIndicator,String ViewFormat,String imageCompressionType)
			{
					this.fileName=fileName;
					this.imageFile=imageFile;
					this.ImageDataOffset=ImageDataOffset;
					this.ImageDataLength=ImageDataLength;
					this.DigitalSignatureDataOffset=DigitalSignatureDataOffset;
					this.DigitalSignatureLength=DigitalSignatureLength;
					this.DigitalSignatureMethod=DigitalSignatureMethod;
					this.SecurityKeySize=SecurityKeySize;
					this.ViewSideIndicator=ViewSideIndicator;
					this.ViewFormat=ViewFormat;
					this.imageCompressionType=imageCompressionType;

					System.out.println("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
					/*System.out.println("fileName::"+fileName);
					System.out.println("ImageDataOffset::"+ImageDataOffset);
					System.out.println("ImageDataLength::"+ImageDataLength);
					System.out.println("DigitalSignatureDataOffset::"+DigitalSignatureDataOffset);
					System.out.println("DigitalSignatureLength::"+DigitalSignatureLength);
					System.out.println("DigitalSignatureMethod::"+DigitalSignatureMethod);
					System.out.println("SecurityKeySize::"+SecurityKeySize);
					System.out.println("ViewSideIndicator::"+ViewSideIndicator);
					System.out.println("ViewFormat::"+ViewFormat);*/
					System.out.println("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
			}//end cons

			//getter
			public String getFileName()
			{
					return fileName;
			}

			public void setImageFile(String imageFile)
			{
					this.imageFile=imageFile;
			}
			public String getImageFile()
			{
					return imageFile;
			}
			public String getImageDataOffset()
			{
					return ImageDataOffset;
			}

			public String getImageDataLength()
			{
					return ImageDataLength;
			}
			public String getDigitalSignatureDataOffset()
			{
					return DigitalSignatureDataOffset;
			}
			public String getDigitalSignatureLength()
			{
						return DigitalSignatureLength;
			}
			public String getDigitalSignatureMethod()
			{
						return DigitalSignatureMethod;
			}
			public String getSecurityKeySize()
			{
					return SecurityKeySize;
			}
			public String getViewSideIndicator()
			{
					return ViewSideIndicator;
			}

			public String getViewFormat()
			{
					return ViewFormat;
			}

		public String getImageCompressionType()
			{
					return imageCompressionType;
			}


			//setter
			public void setFileName(String fileName)
			{
					this.fileName=fileName;
			}


			public void setImageDataOffset(String ImageDataOffset)
			{
					this.ImageDataOffset=ImageDataOffset;;
			}

			public void setImageDataLength(String ImageDataLength)
			{
					this.ImageDataLength=ImageDataLength;
			}
			public void setDigitalSignatureDataOffset(String DigitalSignatureDataOffset)
			{
					this.DigitalSignatureDataOffset=DigitalSignatureDataOffset;
			}
			public void setDigitalSignatureLength(String DigitalSignatureLength)
			{
						this.DigitalSignatureLength=DigitalSignatureLength;
			}
			public void setDigitalSignatureMethod(String DigitalSignatureMethod)
			{
						this.DigitalSignatureMethod=DigitalSignatureMethod;
			}
			public void setSecurityKeySize(String SecurityKeySize)
			{
					this.SecurityKeySize=SecurityKeySize;
			}
			public void setViewSideIndicator(String ViewSideIndicator)
			{
					this.ViewSideIndicator=ViewSideIndicator;
			}

			public void setViewFormat(String ViewFormat)
			{
					this.ViewFormat=ViewFormat;
			}

			public void setImageCompressionType(String imageCompressionType)
			{
					this.imageCompressionType=imageCompressionType;
			}
}//end