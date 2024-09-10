import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { languageQuery, savedLanguage } from "../i18n";
import { useLanguage } from "../context/LanguageContext";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "fr", label: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "es", label: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "ar", label: "العربية", flag: "🇲🇦", dir: "rtl" },
];

const LanguageSelector = () => {
  const { setLanguage } = useLanguage();
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    if (savedLanguage) {
      return languages.find((lang) => lang.code === savedLanguage);
    }
    return languages[0];
  });

  // Set the direction attribute on the HTML element
  useEffect(() => {
    document.documentElement.setAttribute("dir", selectedLanguage.dir);
  }, [selectedLanguage]);

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language.code);
    setLanguage(languageQuery[language.code]);
    // save language to local storage
    localStorage.setItem("savedLanguage", language.code);
    // Update the direction attribute
    document.documentElement.setAttribute("dir", language.dir);
  };

  return (
    <Menu>
      <MenuButton
        px={"1"}
        py={"2"}
        fontSize={{ base: "sm", md: "md" }}
        h={"fit"}
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {`${selectedLanguage.flag} ${selectedLanguage.code}`}
      </MenuButton>
      <MenuList zIndex={"10"}>
        {languages.map((language) => (
          <MenuItem
            px={5}
            gap={2}
            key={language.code}
            onClick={() => handleSelectLanguage(language)}
          >
            {language.flag}
            <Text>{language.label}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSelector;
