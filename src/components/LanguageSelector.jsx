import React, { useState } from "react";
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
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ar", label: "العربية", flag: "🇲🇦" },
];


const LanguageSelector = () => {
  const { setLanguage} = useLanguage()
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    if (savedLanguage) {
      return languages.find((lang) => lang.code === savedLanguage);
    }
    return languages[0];
  });

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language.code);
    setLanguage(languageQuery[language.code]);
    // save language to local storage
    localStorage.setItem("savedLanguage", language.code);
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
            key={language.code}
            onClick={() => handleSelectLanguage(language)}
          >
            {language.flag}
            <Text ml={2}>{language.label}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSelector;
