package cts;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.stream.IntStream;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;

import org.apache.commons.io.FilenameUtils;

import com.sun.media.jai.codec.ImageDecoder;
import com.sun.media.jai.codec.TIFFDecodeParam;

public class TifToJpg {
	public static void main (String argv[])
	{
		TIFFDecodeParam param = null;
        ImageDecoder dec;
		try {
			/*dec = ImageCodec.createImageDecoder("tiff", new File("C:/Users/List/Desktop/07052019/00000f_000000000040923024_G111.jpg"), param);
		
        RenderedImage op = dec.decodeAsRenderedImage(0);

        FileOutputStream fos = new FileOutputStream("C:/Users/List/Desktop/07052019/convertedfile.jpg");
        JPEGEncodeParam jpgparam = new JPEGEncodeParam();
        jpgparam.setQuality(67);
        ImageEncoder en = ImageCodec.createImageEncoder("jpeg", fos, jpgparam);
        en.encode(op);
        fos.flush();
        fos.close();
        System.out.println("Converted Successfully");*/
			//final BufferedImage tif = ImageIO.read(new File("D:/jayesh/abc.tif"));
			//System.out.println(""+tif);
			//ImageIO.write(tif, "png", new File("D:/jayesh/pqr.jpg"));
			convertTiffToPng(new File("D:/jayesh/abc.tif"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static void convertTiffToPng(File file) {
		try {
		    try (InputStream is = new FileInputStream(file)) {
		        try (ImageInputStream imageInputStream = ImageIO.createImageInputStream(is)) {
		            Iterator<ImageReader> iterator = ImageIO.getImageReaders(imageInputStream);
		            if (iterator == null || !iterator.hasNext()) {
		                throw new RuntimeException("Image file format not supported by ImageIO: " + file.getAbsolutePath());
		            }


		            // We are just looking for the first reader compatible:
		            ImageReader reader = iterator.next();
		            reader.setInput(imageInputStream);

		            int numPage = reader.getNumImages(true);

		            // it uses to put new png files, close to original example n0_.tiff will be in /png/n0_0.png
		            String name = FilenameUtils.getBaseName(file.getAbsolutePath()); 
		            String parentFolder = file.getParentFile().getAbsolutePath();

		            IntStream.range(0, numPage).forEach(v -> {
		                try {
		                    final BufferedImage tiff = reader.read(v);
		                    ImageIO.write(tiff, "png", new File(parentFolder + "/png/" + name + v + ".png"));
		                } catch (IOException e) {
		                    e.printStackTrace();
		                }
		            });
		        }
		    }
		} catch (IOException e) {
		    e.printStackTrace();
		}
		}
}

