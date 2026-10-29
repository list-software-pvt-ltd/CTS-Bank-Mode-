#include "TestDll.h"
#include "jni.h"
#include  "stdio.h"
 
JNIEXPORT void JNICALL Java_TestDll_print(JNIEnv *env, jobject obj)
{
  printf("Hello Abhishek Patil welcome To java world\n");
  return;
}