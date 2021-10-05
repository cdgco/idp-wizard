import React, { FC, useState } from "react";
import { IdPButton } from "./components/IdPButton";
import { IdPProtocolSelector } from "./IdPProtocolSelector";

import azureLogo from "@app/bgimages/logos/azure_logo.png";
import oktaLogo from "@app/bgimages/logos/okta_logo.png";
import cyberarkLogo from "@app/bgimages/logos/cyberark_logo.png";
import adfsLogo from "@app/bgimages/logos/adfs_logo.png";
import authoLogo from "@app/bgimages/logos/auth0_logo.png";
import googleLogo from "@app/bgimages/logos/google_saml_logo.png";
import jumpcloudLogo from "@app/bgimages/logos/jumpcloud_logo.png";
import oneloginLogo from "@app/bgimages/logos/onelogin_logo.png";
import openidLogo from "@app/bgimages/logos/openid_logo.png";
import pingFedLogo from "@app/bgimages/logos/ping_federate_logo.png";
import pingOneLogo from "@app/bgimages/logos/ping_one_logo.png";
import samlLogo from "@app/bgimages/logos/saml_logo.png";
import vmwareLogo from "@app/bgimages/logos/vmware_logo.png";

interface idpType {
  name: string;
  imageSrc: string;
  active: boolean | false;
}
export const IdentityProviderSelector: FC = () => {
  const [provider, setProvider] = useState("");
  const [providerImage, setProviderImage] = useState("");
  const imageDirectory = "/src/app/bgimages/logos/";
  const idpList: idpType[] = [
    {
      name: "Azure",
      imageSrc: azureLogo, //imageDirectory + "azure_logo.png",
      active: true,
    },
    { name: "Okta", imageSrc: oktaLogo, active: true },
    { name: "ADFS", imageSrc: adfsLogo, active: false },
    {
      name: "Auth0",
      imageSrc: authoLogo,
      active: false,
    },
    {
      name: "Cyberark",
      imageSrc: cyberarkLogo,
      active: false,
    },
    {
      name: "Google SAML",
      imageSrc: googleLogo,
      active: false,
    },
    {
      name: "Jumpcloud",
      imageSrc: jumpcloudLogo,
      active: false,
    },
    {
      name: "OneLogin",
      imageSrc: oneloginLogo,
      active: false,
    },
    {
      name: "OpenID",
      imageSrc: openidLogo,
      active: false,
    },
    {
      name: "Ping Federate",
      imageSrc: pingFedLogo,
      active: false,
    },
    {
      name: "Ping One",
      imageSrc: pingOneLogo,
      active: false,
    },
    { name: "SAML", imageSrc: samlLogo, active: false },
    {
      name: "VMWare",
      imageSrc: vmwareLogo,
      active: false,
    },
  ];

  const setProviders = (selectedProvider, selectedProviderImage) => {
    setProvider(selectedProvider);
    setProviderImage(selectedProviderImage);
  };

  return provider == "" ? (
    <div className="container">
      <div className="vertical-center">
        <h1>Choose your Identity Provider {provider}</h1>
        <h2>This is how users will sign in to demo.phasetwo.io</h2>
        <div className="selection-container">
          {idpList.map((idp: idpType) => {
            return (
              <IdPButton
                key={idp.name}
                text={idp.name}
                image={idp.imageSrc}
                active={idp.active}
                onSelect={() => setProviders(idp.name, idp.imageSrc)}
              />
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <IdPProtocolSelector
      selectedProtocol={provider}
      selectedProtocolImage={providerImage}
      goBack={() => setProviders("", "")}
    />
  );
};
