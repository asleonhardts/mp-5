"use client";
import {useState, type SubmitEvent} from "react";
import styled from "styled-components";

const StyledBox = styled.div`
    margin: 2% auto;
    display: flex;
    flex-direction: column;
    background-color: #15969D;
    border: 3px solid #394648;
    border-radius: 10px;
    height: 28vw;
    width: 60vw;
    padding: 3%;
    box-shadow: 1px 5px 2em #140D00;
    
    form {
        margin: 0;
    }

    input {
        width: 30vw;
        padding: 1vw;
        font-size: 1.2vw;
        border-radius: 12px;
        background-color: #18ACB4;
        border: 2px solid #394648;
    }
    
    input::placeholder {
        color: papayawhip;
        font-family: "Trebuchet MS", Helvetica, sans-serif;
    }
    
    p {
        font-family: "Trebuchet MS", Helvetica, sans-serif;
        font-weight: 1000;
        margin: auto;
        color: #6D0808;
        font-size: 1.7vw;
    }
    
    a {
        font-family: "Trebuchet MS", Helvetica, sans-serif;
        padding-left: 3%;
        color: #394648;
    }
    
    // button for input
    .bIn {
        margin: 3% auto;
        display: block;
        background-color: #111344;
        color: #EEEAD7;
        font-size: calc(0.5px + 2vw);
        padding: 2%;
        border: none;
        border-radius: 17px;
        font-family: "Trebuchet MS", Helvetica, sans-serif;
    }
    
    .urlP {
        font-weight: 500;
    }
`;

const StyledHeader = styled.h1`
    margin: auto;
    text-align: center;
    background-color: #6D0808;
    padding: 1%;
    color: #EEEAD7;
    font-family: "Gill Sans MT", Helvetica, sans-serif;
`;

const StyledH1 = styled.h1`
    margin: 5% 3% auto;
    text-align: center;
    font-family: "Arial Black", Arial, sans-serif;
    color: #6D0808;
`;

const StyledH3 = styled.h3`
    margin: 0;
    text-align: center;
    font-family: "Arial Black", Arial, sans-serif;
    color: #6D0808;
`;

const StyledDiv = styled.div`
    margin: auto;
    text-align: center;
`;

const StyledLabel = styled.label`
    font-family: "Trebuchet MS", Helvetica, sans-serif;
    font-size: calc(1px + 2vw);
`;

// button for Copy URL
const StyledButton = styled.button`
    background-color: #111344;
    color: papayawhip;
    border: none;
    border-radius: 10px;
    padding: 1%;
    margin-left: 2%;
    font-family: "Trebuchet MS", Helvetica, sans-serif;
`;

export default function ShortenURL() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [message, setMessage] = useState("");
    const [shortURL, setShortURL] = useState("");

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        setShortURL("");
        setMessage("");
        try {
            const response = await fetch('/api/shorten', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url, alias })
            });
            const data = await response.json();

            if (response.ok) {
                setMessage("URL shortened successfully!");
                setShortURL(`${window.location.origin}/${alias}`);
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            {/* header */}
            <StyledHeader>URL Shortener</StyledHeader>
            <StyledH1>Shorten your long URLs!</StyledH1>
            <StyledH3>Create compact links that are easy to share</StyledH3>
            <StyledBox>
                <form onSubmit={handleSubmit}>
                    {/* input for URL */}
                    <StyledDiv>
                        <StyledLabel>Original URL: </StyledLabel>
                        <input
                            type="url"
                            value={url}
                            onChange={(event) => setUrl(event.target.value)}
                            placeholder="Enter your URL"
                        />
                    </StyledDiv>
                    <br/>
                    {/* input for alias */}
                    <StyledDiv>
                        <StyledLabel>Choose an alias: </StyledLabel>
                        <input
                            type="text"
                            value={alias}
                            onChange={(event) => setAlias(event.target.value)}
                            placeholder="Enter your alias"
                        />
                    </StyledDiv>

                    <button className="bIn" type="submit">Shorten URL</button>
                </form>

                {/* output */}
                <p>{message}</p>
                {shortURL && (
                    <div>
                        <p className="urlP" >Your shortened URL:</p>
                        <a href={shortURL}>{shortURL}</a>

                        <StyledButton onClick={() => navigator.clipboard.writeText(shortURL)}>
                            Copy URL
                        </StyledButton>
                    </div>
                )}
            </StyledBox>
        </>
    );
}