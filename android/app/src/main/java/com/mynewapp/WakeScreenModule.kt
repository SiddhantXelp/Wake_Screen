package com.mynewapp

import android.app.Activity
import android.os.PowerManager
import android.view.WindowManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.media.MediaPlayer

class WakeScreenModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "WakeScreen"
    }

    @ReactMethod
    fun wakeUp() {
        val activity: Activity? = currentActivity
        if (activity != null) {
            val powerManager =
                activity.getSystemService(Activity.POWER_SERVICE) as PowerManager
            val wakeLock = powerManager.newWakeLock(
                PowerManager.FULL_WAKE_LOCK or PowerManager.ACQUIRE_CAUSES_WAKEUP or PowerManager.ON_AFTER_RELEASE,
                "MyApp::WakeLock"
            )
            wakeLock.acquire(3000) // Wake up for 3 seconds

            activity.runOnUiThread {
                activity.window.addFlags(
                    WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
                            WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD or
                            WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON or
                            WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
                )
            }

                    // Play custom sound
        val mediaPlayer = MediaPlayer.create(activity, R.raw.wake_up_sound)
        mediaPlayer.start()
        mediaPlayer.setOnCompletionListener {
            mediaPlayer.release() // Release resources after playback
        }
            wakeLock.release()
        }
    }
}
