E:  
cd Apache6\webapps\CTS_FINAL_IN_PROGRESS\WEB-INF\classes\cts
set ctsclasspath=.;e:\Apache6\lib\org-apache-commons-codec.jar;e:\Apache6\lib\FTPFileTransJar\commons-net-3.3.jar;e:\Apache6\lib\mail-1.4.jar;e:\Apache6\lib\classes12.jar;e:\Apache6\lib\commons-io-2.4.jar;e:\Apache6\webapps\CTS_FINAL_IN_PROGRESS\WEB-INF\classes;
set classpath=%ctsclasspath%;
set path=C:\Program Files (x86)\Java\jdk1.7.0_55\bin
javac *.java

pause;


