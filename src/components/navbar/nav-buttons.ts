import { ProfileIcon } from "../icons/duotone/profile"
import { SecurityIcon } from "../icons/duotone/security";
import { SettingsIcon } from "../icons/duotone/settings";
// import { SunIcon } from "../icons/duotone/sun"
import { PhFlagIcon } from "../icons/flags/ph"
import { ThemeSwitch } from "../theme-switch/switch";
import Notification from "./notification";

export default [
    { id: "flag", icon: PhFlagIcon },
    { id: "notifications", icon: Notification },
    { id: "profile", icon: ProfileIcon },
    { id: "themeToggle", icon: ThemeSwitch },
];

export const drawer_links = [
    { id: "1", icon: ProfileIcon, label: "Profile", href: "/user/profile" },
    { id: "2", icon: SettingsIcon, label: "Account Settings", href: "#" },
    { id: "3", icon: SecurityIcon, label: "Security", href: "#" },
]