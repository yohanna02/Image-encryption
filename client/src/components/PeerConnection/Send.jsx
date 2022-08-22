import { useEffect, useState, useRef } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import { QRCodeSVG } from "qrcode.react";
import { useConnection } from "../../context/ConnectionProvider"

function Send() {
  const [peerConnection, setPeerConnection] = useState(new RTCPeerConnection());
  let dataChannel = peerConnection.createDataChannel("channel");

  const [iceCandidate, setIceCandidate] = useState("");
  const [showToolTips, setShowToolTips] = useState(false);
  const target = useRef(null);

  const { setConnected } = useConnection();

  useEffect(() => {
    function startWebRTC() {
    //     setPeerConnection(new RTCPeerConnection());
    //   dataChannel = peerConnection.createDataChannel("channel");

      peerConnection
        .createOffer()
        .then((offer) => {
          peerConnection.setLocalDescription(offer);
        })
        .then(() => {
          console.log("offer set");
        });

      dataChannel.onopen = (e) => {
        setConnected(true);
        console.log("Connection opened");
      };

      dataChannel.onclose = (e) => {
        console.log("Connection Closed");
        setConnected(false);
      };

      peerConnection.onicecandidate = (e) => {
        const _iceCandidate = JSON.stringify(peerConnection.localDescription);

        setIceCandidate(_iceCandidate);
      };
    }

    startWebRTC();

    return () => {
      console.log("bye");
      dataChannel.close();
      dataChannel = null;
      peerConnection.close();
      setPeerConnection(null);
    };
  }, []);

  function copyText() {
    navigator.clipboard.writeText(iceCandidate);
    setShowToolTips(true);

    setTimeout(() => {
      setShowToolTips(false);
    }, 3000);
  }

  function enterReceiverAnswer() {
    const answer = prompt("Enter Receiver Answer");

    if (answer) {
      const des = new RTCSessionDescription(JSON.parse(answer));
      console.log(peerConnection);
      peerConnection.setRemoteDescription(des);
      // console.log(answer)
    }
  }

  return (
    <>
      {iceCandidate !== "" && (
        <QRCodeSVG value={iceCandidate} size="400" style={{ width: "100%" }} />
      )}
      <div className="mt-3 d-flex justify-content-evenly">
        <Button ref={target} onClick={copyText}>
          Copy
        </Button>
        <Overlay target={target.current} show={showToolTips} placement="right">
          {(props) => (
            <Tooltip id="overlay-example" {...props}>
              Copied!
            </Tooltip>
          )}
        </Overlay>
        <Button onClick={enterReceiverAnswer}>Enter Receiver Answer</Button>
      </div>
    </>
  );
}

export default Send;
