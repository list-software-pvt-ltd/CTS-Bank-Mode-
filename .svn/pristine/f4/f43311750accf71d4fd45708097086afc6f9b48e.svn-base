package cts;

import java.io.*;
import javax.imageio.*;
import java.util.Iterator;
import java.io.BufferedReader;
import javax.imageio.ImageIO;
import java.util.stream.IntStream;
import org.apache.commons.io.FilenameUtils;
import java.awt.image.BufferedImage;
import javax.imageio.stream.ImageInputStream;

class TifToJpgConverter
{
	public void convertTiffToJpg(File file) {
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
	            String name = FilenameUtils.getBaseName(file.getAbsolutePath());
	            String parentFolder = file.getParentFile().getAbsolutePath();

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
}

