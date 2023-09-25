import { useEffect, useState } from "react";
import axios from "axios";
import { Notify } from "notiflix";
import { useProtectedContext } from "../Context/prodected";

interface IRecordData {
    _id: string,
    userId: string,
    type: string,
    status: string,
    __v?: number,
    path?: string
}

export default function Recorder() {
    const [type, setType] = useState("audio");
    const [recorder, setRecorder] = useState<MediaRecorder | null>(null)
    const [videosrc, setVideosrc] = useState("");
    const [recordData, setRecordData] = useState<IRecordData>();
    const [screenState, setScreenState] = useState<Boolean>(false);
    const [stopState, setStopState] = useState<Boolean>(true);
    const { token } = useProtectedContext();

    useEffect(() => {
        console.log("innnnnnnnnnnnnnnnn");
        const newfunct = async () => {
            if (screenState) {
        console.log("innnnnnnnnnnnnnnnn");

                await onStop()
            }
        }
        newfunct();
    }, [screenState]);

    const onStart = async () => {
        const startBtns = document.getElementsByClassName("start_class");
        for (let i = 0; i < startBtns.length; i++) {
            startBtns[i].classList.remove("able-anchor");
            startBtns[i].classList.add("disable-anchor");
        }

        if(document.getElementById("video_screen")?.classList.contains("hidden")){
            document.getElementById("video_showscreen")?.classList.add("hidden");
            document.getElementById("video_screen")?.classList.remove("hidden");
        }
        axios.post("http://localhost:3001/api/record/start", {
            type,
            status: "Recording"
        }, { headers: { "Authorization": token } }).then(data => {
            if (data.data.status) {
                Notify.success(data.data.message);
                console.log(data.data.data);
                setRecordData(data.data.data);
            } else {
                Notify.failure(data.data.message);
            }
        });
    }


    const onStop = async () => {
        const startBtns = document.getElementsByClassName("start_class");
        for (let i = 0; i < startBtns.length; i++) {
            startBtns[i].classList.add("able-anchor");
            startBtns[i].classList.remove("disable-anchor");
        }
        axios.post("http://localhost:3001/api/record/stop", {
            mediaId: recordData?._id,
            type,
            status: "stopped"
        }, { headers: { "Authorization": token } }).then(data => {
            if (data.data.status) {
                Notify.success(data.data.message);

            } else {
                Notify.failure(data.data.message);
            }
        });
    }

    const startVideoWithAudio = async () => {
        setType("video");
        setVideosrc("");
        const screenStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        const mediaRecorder = new MediaRecorder(screenStream);

        mediaRecorder.onstart = (e) => {
            onStart().then(() => {
                var videoElement = document.getElementById("video_screen") as HTMLVideoElement | null;
                if (videoElement) {
                    videoElement.srcObject = screenStream;
                }
                document.getElementById("stop_recording")?.classList.remove("disable-anchor");
                document.getElementById("stop_recording")?.classList.add("able-anchor");
            }).catch((error) => {
                console.log(error);
            });
        }

        mediaRecorder.start();

        setRecorder(mediaRecorder);

    }

    const stopRecord = () => {
        console.group("clicked")
        if (recorder) {
            setStopState(false);
            console.log("this after")
            recorder.stop();
            const data: Blob[] = [];

            recorder.ondataavailable = (e) => {

                data.push(e.data);

                onStop().then(() => {

                    var ObjectUrl: string = URL.createObjectURL(new Blob(data, { type: data[0].type }));
                    setVideosrc(ObjectUrl);
                    document.getElementById("video_screen")?.classList.add("hidden");
                    document.getElementById("video_showscreen")?.classList.remove("hidden");
                    document.getElementById("anchor_download")?.classList.remove("disable-anchor");
                    document.getElementById("anchor_download")?.classList.add("able-anchor");
                }).catch(error => {
                    console.log(error)
                });
            }
            setRecorder(null);

            const mediaStream = recorder.stream;
            if (mediaStream) {
                mediaStream.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        }
        document.getElementById("stop_recording")?.classList.add("disable-anchor");
        document.getElementById("stop_recording")?.classList.remove("able-anchor");
    }

    const startVideoWithoutAudio = async () => {
        setType("video");
        setVideosrc("");
        const screenStream = await navigator.mediaDevices.getUserMedia({ video: true });

        const mediaRecorder = new MediaRecorder(screenStream);

        mediaRecorder.onstart = (e) => {
            onStart().then(() => {
                var videoElement = document.getElementById("video_screen") as HTMLVideoElement | null;
                if (videoElement) {
                    videoElement.srcObject = screenStream;
                }
                document.getElementById("stop_recording")?.classList.remove("disable-anchor");
                document.getElementById("stop_recording")?.classList.add("able-anchor");
            }).catch(error => {
                console.log(error);
            })
        }

        mediaRecorder.start();

        setRecorder(mediaRecorder);
    }

    const startScreenShareWithAudio = async () => {
        setType("screen");
        setVideosrc("");
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                mediaSource: "screen"
            } as MediaTrackConstraints,
            audio: true
        });

        const audiostream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mixedStream = new MediaStream();

        stream.getVideoTracks().forEach((track) => {
            mixedStream.addTrack(track);
        });
        audiostream.getAudioTracks().forEach((track) => {
            mixedStream.addTrack(track);
        });
        const mediaRecorder = new MediaRecorder(mixedStream);


        mediaRecorder.start();
        mediaRecorder.onstart = (e) => {
            onStart().then(() => {
                var videoElement = document.getElementById("video_screen") as HTMLVideoElement | null;
                if (videoElement) {
                    videoElement.srcObject = stream;
                }
                document.getElementById("stop_recording")?.classList.remove("disable-anchor");
                document.getElementById("stop_recording")?.classList.add("able-anchor");
            }).catch(error => {
                console.log(error);
            })
        }

        setRecorder(mediaRecorder);
        const data: Blob[] = [];
        mediaRecorder.ondataavailable = (e) => {
            data.push(e.data);
        }
    }

    const startScreenShare = async () => {
        setType("screen");
        setVideosrc("");
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                mediaSource: "screen"
            } as MediaTrackConstraints
        })

        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.start();
        setRecorder(mediaRecorder);
        mediaRecorder.onstart = (e) => {
            onStart().then(() => {
                var videoElement = document.getElementById("video_screen") as HTMLVideoElement | null;
                if (videoElement) {
                    videoElement.srcObject = stream;
                }
                document.getElementById("stop_recording")?.classList.remove("disable-anchor");
                document.getElementById("stop_recording")?.classList.add("able-anchor");
            }).catch(error => {
                console.log(error);
            })

        }
        const data: Blob[] = [];
        mediaRecorder.ondataavailable = (e) => {
            data.push(e.data);
        }


        mediaRecorder.onstop = (e) => {
            if (stopState && data.length > 0) {
                setScreenState(true);
                var ObjectUrl: string = URL.createObjectURL(new Blob(data, { type: data[0].type }));
                setVideosrc(ObjectUrl);
                document.getElementById("video_screen")?.classList.add("hidden");
                document.getElementById("video_showscreen")?.classList.remove("hidden");
                document.getElementById("anchor_download")?.classList.remove("disable-anchor");
                document.getElementById("anchor_download")?.classList.add("able-anchor");
                setRecorder(null);
                document.getElementById("stop_recording")?.classList.add("disable-anchor");
                document.getElementById("stop_recording")?.classList.remove("able-anchor");
            }
        }
    }

    const startRecordAudio = async () => {
        setType("audio");
        setVideosrc("");
        const screenStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const mediaRecorder = new MediaRecorder(screenStream);

        mediaRecorder.onstart = (e) => {
            onStart().then(() => {
                var videoElement = document.getElementById("video_screen") as HTMLVideoElement | null;
                if (videoElement) {
                    videoElement.srcObject = screenStream;
                }
                document.getElementById("stop_recording")?.classList.remove("disable-anchor");
                document.getElementById("stop_recording")?.classList.add("able-anchor");
                document.getElementById("audio_wave")?.classList.remove("hidden");
            }).catch((error) => {
                console.log(error);
            });
        }

        mediaRecorder.start();

        setRecorder(mediaRecorder);
        mediaRecorder.onstop = (e) => {
            document.getElementById("audio_wave")?.classList.add("hidden");
        }
    }






    return (
        <div className=" items-center justify-center text-center">
            <div className="flex text-center justify-center">
                <span className="hover:cursor-pointer p-4 m-4 rounded bg-gradient-to-br start_class able-anchor" onClick={startRecordAudio} >Start Audio</span>
                <span className="hover:cursor-pointer p-4 m-4 rounded bg-gradient-to-br start_class able-anchor" onClick={startVideoWithoutAudio}>Start Video Without Audio</span>
                <span className="hover:cursor-pointer p-4 m-4 rounded bg-gradient-to-br start_class able-anchor" onClick={startVideoWithAudio}>Start Video With Audio</span>
                <span className="hover:cursor-pointer p-4 m-4 rounded bg-gradient-to-br start_class able-anchor" onClick={startScreenShare}>Start Screen Record</span>
                <span className="hover:cursor-pointer p-4 m-4 rounded bg-gradient-to-br start_class able-anchor" onClick={startScreenShareWithAudio}>Start Screen With Audio</span>
            </div>
            {type == "screen" || type == "video" ?
                <div className="flex flex-col items-center">
                    <video className="bg-black w-2/4 h-3/5" id="video_screen" autoPlay />
                    <video className="bg-black w-2/4 h-3/5 hidden" src={videosrc} id="video_showscreen" controls autoPlay />

                    <div className="mt-6">
                        <a download id="anchor_download" href={videosrc} className="disable-anchor hover:cursor-pointer p-4 m-4 rounded bg-gradient-to-br" >Download</a>
                        <span id="stop_recording" className="hover:cursor-pointer p-4 m-4 rounded bg-gradient-to-br disable-anchor" onClick={stopRecord} >Stop Record</span>

                    </div>
                </div>
                :
                <div className="flex flex-col items-center" >
                    <img id="audio_wave" className="hidden" alt="audiowave" src="/img/audiowave.gif" />

                    <audio src={videosrc} controls autoPlay />
                    <div className="mt-6">

                        <a download id="anchor_download" href={videosrc} className="disable-anchor hover:cursor-pointer p-4 m-4 rounded bg-gradient-to-br" >Download</a>
                        <span id="stop_recording" className="hover:cursor-pointer p-4 m-4 rounded bg-gradient-to-br disable-anchor" onClick={stopRecord} >Stop Record</span>

                    </div>
                </div>
            }
        </div>
    )
}
