# CloudPantry

## How to run locally:

Open an Android Virtual Device in Android Studio

then run <code> react-native run-android </code> in /cloudpantry/

## How to push to production:

Go into app\build.gradle and update the versionCode and versionName variables. 
 <br> General rule of thumb for a version like this: 2.4.6 <br> 
Incrementing the .6 means a small hotfix.  <br> Incrementing the .4 would mean a feature change.  <br> Incrementing the 2 would indicate breaking changes and large scale feature changes.  

Make sure you have set environment variables in /cloudpantry/android/gradle.properties, ask Ewan for them, along with the release key. <br>
MYAPP_RELEASE_STORE_FILE=key-store.jks <br>
MYAPP_RELEASE_KEY_ALIAS=alias <br>
MYAPP_RELEASE_STORE_PASSWORD=******** <br>
MYAPP_RELEASE_KEY_PASSWORD=******** <br>

Now go to android studio, open build>Generate Signed APKs. After receiving the key, navigate to it and enter the key alias and store/key passwords (should be the same as above). 

Select next

Check off V1 and V2 signature versions, and make sure build type is release. Hit finish, this will build a signed APK in /cloudpantry/android/app/release

### To test release on your local machine `*required*` <br>
<code>
react-native run-android --variant=release </code> in the root folder. 
If everything checks out, go to the google playstore, fill out all the fields, and upload the APK from /android/app/release/app-release.apk

## IMPORTANT!!! Delete the environment variables from /android/gradle.properties so they do not get checked into the version control. 

After all of this, pat yourself on the back. You did great kid.