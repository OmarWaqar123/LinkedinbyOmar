// import { parse } from 'url';

export default function GetMainUrlName(urlString) {
    const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
    const matches = urlString.match(regex);
    const mainUrlName = matches && matches[1];
    if (!mainUrlName) {
      return "";
    }
    const parts = mainUrlName.split('.');
    return parts[1] || parts[0];
    }
  