package cts;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.stream.IntStream;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import javax.media.jai.JAI;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.pdf.PdfWriter;
import com.sun.media.jai.codec.FileSeekableStream;
import com.sun.media.jai.codec.ImageCodec;
import com.sun.media.jai.codec.ImageDecoder;
import com.sun.media.jai.codec.TIFFDecodeParam;

public class ImgConvertor1 {


	public static void main(String[] args) throws IOException {

		/*final BufferedImage bufferedImage = new BufferedImage(100, 100, BufferedImage.TYPE_INT_RGB);
		
		Iterator iter = ImageIO.getImageWritersByFormatName("jpeg");
		ImageWriter writer = (ImageWriter)iter.next();
		ImageWriteParam iwp = writer.getDefaultWriteParam();
		iwp.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
		iwp.setCompressionQuality(1);   // an integer between 0 and 1
		
		File file = new File("D:/jayesh/pqr.jpg");
		FileImageOutputStream output = new FileImageOutputStream(file);
		writer.setOutput(output);
		
		
		IIOImage image = new IIOImage(bufferedImage, null, null);
		writer.write(null, image, iwp);
		writer.dispose();*/
		/*
		 * SeekableStream s = new FileSeekableStream(inFile); TIFFDecodeParam param =
		 * null; ImageDecoder dec = ImageCodec.createImageDecoder("tiff", s, param);
		 * RenderedImage op = dec.decodeAsRenderedImage(0);
		 * 
		 * FileOutputStream fos = new FileOutputStream(otPath); JPEGEncodeParam jpgparam
		 * = new JPEGEncodeParam(); jpgparam.setQuality(67); ImageEncoder en =
		 * ImageCodec.createImageEncoder("jpeg", fos, jpgparam); en.encode(op);
		 * fos.flush(); fos.close();
		 */
		/*
		 * File folder = new File("D:/jayesh/"); // File[] listOfFiles =
		 * folder.listFiles();
		 * //System.out.println("Total No of Files:"+listOfFiles.length); Image img =
		 * null; BufferedImage tempPNG = null; BufferedImage tempJPG = null; File
		 * newFilePNG = null; File newFileJPG = null; //for (int i = 0; i <
		 * listOfFiles.length; i++) { // if (listOfFiles[i].isFile()) {
		 * //System.out.println("File " + listOfFiles[i].getName()); img =
		 * ImageIO.read(new File("D:/jayesh/abc.jpg")); tempPNG = resizeImage(img, 100,
		 * 100); tempJPG = resizeImage(img, 100, 100); newFilePNG = new
		 * File("D:/jayesh/png_New.png"); newFileJPG = new
		 * File("D:/jayesh/jpg_New.jpg"); ImageIO.write(tempPNG, "png", newFilePNG);
		 * ImageIO.write(tempJPG, "jpg", newFileJPG); // } //}
		 */	
		// BufferedImage tif = ImageIO.read(new File("D:/jayesh/abc.tif"));
		//ImageIO.write(tif, "jpg", new File("D:/jayesh/pqr.jpg"));
		try {
			//ConvertTiffToJpg("D:/jayesh/abc.tif","D:/jayesh/pqr.jpg");
			TiffToJpg("D:/jayesh/aaa.tif","D:/jayesh/pqr.jpg");
			//convertTiffToJpg(new File("D:/jayesh/abc.jpg"));
		} catch (Exception e) {
			
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		System.out.println("DONE");
		
	}
	public static void TiffToJpg(String tiff, String output)
            throws IOException, DocumentException {
        // PDF conversation starts here
        Document document = new Document();
        FileOutputStream fos = new FileOutputStream(output);
        PdfWriter writer = PdfWriter.getInstance(document, fos);
        writer.open();
        document.open();
        String fileName = tiff;
        Iterator readers = ImageIO
                .getImageReadersBySuffix("tiff");
        if (readers.hasNext()) {
            File fi = new File(fileName);
            ImageInputStream iis = ImageIO
                    .createImageInputStream(fi);
            TIFFDecodeParam param = null;
            ImageDecoder dec = ImageCodec.createImageDecoder("tiff", fi, param);
            int pageCount = dec.getNumPages();
            ImageReader _imageReader = (ImageReader) (readers.next());
            if (_imageReader != null) {
                _imageReader.setInput(iis, true);
                int count = 1;
                for (int i = 0; i < pageCount; i++) {
                    BufferedImage bufferedImage = _imageReader.read(i);
                    BufferedImage img2 = new BufferedImage(
                            bufferedImage.getWidth(),
                            bufferedImage.getHeight(),
                            BufferedImage.TYPE_INT_RGB);
                    // Set the RGB values for converted image (jpg)
                    for (int y = 0; y < bufferedImage.getHeight(); y++) {
                        for (int x = 0; x < bufferedImage.getWidth(); x++) {
                            img2.setRGB(x, y, bufferedImage.getRGB(x, y));
                        }
                    }
                    System.out.println("Page: " + (i + 1));
                    // Set the RGB values for converted image (jpg)
                   //To image
                        String s = output;
                    ImageIO.write(img2, "jpg", new File(s));
                    //To pdf
					/*
					 * ByteArrayOutputStream baos = new ByteArrayOutputStream(); ImageIO.write(img2,
					 * "jpg", baos); baos.flush(); // Convert byteArrayoutputSteam to ByteArray
					 * byte[] imageInByte = baos.toByteArray();
					 * document.add(Image.getInstance(imageInByte)); baos.close();
					 */
                }
                document.close();
            }
            else {
            	
            	System.out.println("else madhe al");
            }
        }
        else {
         	System.out.println("2 else madhe al");
        }
    }
	public static void convertTiffToJpg(File file) {
		try
		{
		    try (InputStream is = new FileInputStream(file))
		    {
		        try (ImageInputStream imageInputStream = ImageIO.createImageInputStream(is))
		        {
		            Iterator<ImageReader> iterator = ImageIO.getImageReaders(imageInputStream);
		            if (iterator == null || !iterator.hasNext())
		            {
		                throw new RuntimeException("Image file format not supported by ImageIO: " + file.getAbsolutePath());
		            }

		            // We are just looking for the first reader compatible:
		            ImageReader reader = iterator.next();
		            reader.setInput(imageInputStream);

		            int numPage = reader.getNumImages(true);

		            // it uses to put new png files, close to original example n0_.tiff will be in /png/n0_0.png
		            String name ="pqr";
		            String parentFolder = "D:/jayesh";//file.getParentFile().getAbsolutePath();

		            IntStream.range(0, numPage).forEach(v -> {
		                try {
		                    final BufferedImage tiff = reader.read(v);
		                    ImageIO.write(tiff, "jpg", new File(parentFolder + "/" + name + ".jpg"));
		                } catch (IOException e) {
		                    e.printStackTrace();
		                  //  System.out.println("excep1====="+e);
		                }
		            });
		        }
		    }
		} catch (IOException e) {
		    e.printStackTrace();
		  //  System.out.println("excep2====="+e);
		}
	}

	/*
	 * public static void TiffToJpg(String tiff, String output) throws IOException {
	 * File tiffFile = new File(tiff); SeekableStream s = new
	 * FileSeekableStream(tiffFile); TIFFDecodeParam param = null; ImageDecoder dec
	 * = ImageCodec.createImageDecoder("tiff", s, param); RenderedImage op =
	 * dec.decodeAsRenderedImage(0); FileOutputStream fos = new
	 * FileOutputStream(output); JPEGImageEncoder jpeg =
	 * JPEGCodec.createJPEGEncoder(fos); jpeg.encode(op.getData()); fos.close(); }
	 */
	public static void ConvertTiffToJpg(String str_TiffUrl, String str_JpgFileDestinationUrl) throws Exception
	  {
	    try
	    {
	      FileSeekableStream obj_FileSeekableStream = new FileSeekableStream(new File(str_TiffUrl));
	      ImageDecoder obj_ImageDecoder = ImageCodec.createImageDecoder("tiff", obj_FileSeekableStream, null);
	      RenderedImage obj_RenderedImage = obj_ImageDecoder.decodeAsRenderedImage();
	      JAI.create("filestore",obj_RenderedImage,str_JpgFileDestinationUrl, "jpeg");
	      obj_RenderedImage = null;
	      obj_ImageDecoder = null;
	      obj_FileSeekableStream.close();
	    }
	    catch(Exception ex)
	    {
	      throw ex;
	    }

}
	/**
	 * This function resize the image file and returns the BufferedImage object that can be saved to file system.
	 */
	/*
	 * public static BufferedImage resizeImage(final Image image, int width, int
	 * height) { final BufferedImage bufferedImage = new BufferedImage(width,
	 * height, BufferedImage.TYPE_INT_RGB); final Graphics2D graphics2D =
	 * bufferedImage.createGraphics(); graphics2D.setComposite(AlphaComposite.Src);
	 * //below three lines are for RenderingHints for better image quality at cost
	 * of higher processing time
	 * graphics2D.setRenderingHint(RenderingHints.KEY_INTERPOLATION,RenderingHints.
	 * VALUE_INTERPOLATION_BILINEAR);
	 * graphics2D.setRenderingHint(RenderingHints.KEY_RENDERING,RenderingHints.
	 * VALUE_RENDER_QUALITY);
	 * graphics2D.setRenderingHint(RenderingHints.KEY_ANTIALIASING,RenderingHints.
	 * VALUE_ANTIALIAS_ON); graphics2D.drawImage(image, 0, 0, width, height, null);
	 * graphics2D.dispose(); return bufferedImage; }
	 */
}
