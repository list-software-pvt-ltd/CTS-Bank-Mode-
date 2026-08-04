package cts;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class ZipCreator
{	
    public static void zipFolder(String sourceFolder, String zipFileName) {
        try (FileOutputStream fos = new FileOutputStream(zipFileName);
             ZipOutputStream zipOut = new ZipOutputStream(fos)) {

            File folder = new File(sourceFolder);
            System.out.println("folder==="+folder);
            System.out.println("folder.getName()==="+folder.getName());
            //System.out.println("zipOut==="+zipOut);
            zipFiles(folder, folder.getName(), zipOut);
            System.out.println("Zip file created successfully!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private static void zipFiles(File folder, String baseFolder, ZipOutputStream zipOut) throws IOException {
        File[] files = folder.listFiles();
        if (files != null ) {
            for (File file : files) {
                if (file.isDirectory()) {
                    zipFiles(file, baseFolder + "/" + file.getName(), zipOut);
                } 
                else
                {
                    try (FileInputStream fis = new FileInputStream(file)) {
                        String entryPath = baseFolder + "/" + file.getName();
                        ZipEntry zipEntry = new ZipEntry(entryPath);
                        zipOut.putNextEntry(zipEntry);
                        byte[] bytes = new byte[1024];
                        int length;
                        while ((length = fis.read(bytes)) >= 0) 
                        {
                            zipOut.write(bytes, 0, length);
                        }
                    }
                }
            }
        }
    }
}