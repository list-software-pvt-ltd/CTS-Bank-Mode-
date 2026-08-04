#include "cts_DllFunction.h"
#include "jni.h"
#include "stdio.h"
 
JNIEXPORT jdouble JNICALL Java_cts_DllFunction_compute(JNIEnv * env, jclass jClass, jint m, jlong n)
{
	jdouble result = m + n + 100;
	return result;
}