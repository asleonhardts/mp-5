import React from "react";
import styled, {createGlobalStyle} from "styled-components";

const UniversalStyle=createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

const StyledBody=styled.body`
    background-color: papayawhip;
`;

export default function RootLayout (
    {children,}:
        Readonly<{children: React.ReactNode;}>
){
  return (
      <html lang="en">
          <StyledBody>
              <UniversalStyle/>
              {children}
          </StyledBody>
      </html>
  );
}