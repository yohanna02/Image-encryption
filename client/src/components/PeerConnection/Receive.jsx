import { useEffect, useState, useRef } from "react";
import { QrScanner } from "react-qrcode-scanner";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import { QRCodeSVG } from "qrcode.react";
import { useConnection } from "../../context/ConnectionProvider"

function Receive() {
  const [iceCandidate, setIceCandidate] = useState("");
  const [showToolTips, setShowToolTips] = useState(false);
  const target = useRef(null);

  const { setConnected } = useConnection();

  const [peerConnection, setPeerConnection] = useState(new RTCPeerConnection());
  let dataChannel = peerConnection.createDataChannel("channel");
  useEffect(() => {
    function startWebRTC() {
      // setPeerConnection(new RTCPeerConnection());
      // dataChannel = peerConnection.createDataChannel("channel");

      peerConnection.ondatachannel = (e) => {
        dataChannel = e.channel;
      };

      dataChannel.onopen = (e) => {
        console.log("Connection opened");
        setConnected(true);
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

  const [text, setText] = useState("");

  function handleScan(value) {
    setText(value);
    console.log({ value });
  }

  function handleError(error) {
    console.log({ error });
  }

  function enterSenderOffer() {
    const offer = prompt("Enter Sender's Offer");

    const des = new RTCSessionDescription(JSON.parse(offer));
    peerConnection.setRemoteDescription(des).then(() => {
      console.log("offer set");
    });

    peerConnection
      .createAnswer()
      .then((answer) => {
        peerConnection.setLocalDescription(answer);
      })
      .then(() => {
        console.log("Anwer created");
      });
  }

  function copyText() {
    navigator.clipboard.writeText(iceCandidate);
    setShowToolTips(true);

    setTimeout(() => {
        setShowToolTips(false);
    }, 3000);
  }

  return (
    <>
      {/* <div style={{ height: "20rem", position: "relative" }}>
        <QrScanner onScan={handleScan} onError={handleError} />
      </div> */}
      {iceCandidate === "" ? (
        <Button onClick={enterSenderOffer}>Enter Sender's Offer</Button>
      ) : (
        <>
          <QRCodeSVG value={iceCandidate} size="400" style={{ width: "100%" }} />
          <div className="mt-3 d-flex justify-content-evenly">
              <Button ref={target} onClick={copyText}>Copy</Button>
              <Overlay target={target.current} show={showToolTips} placement="right">
                {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  Copied!
                </Tooltip>
                )}
              </Overlay>
            </div>
        </>
      )}
      <p>{text}</p>
    </>
  );
}

export default Receive;
