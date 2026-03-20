// Pre-imported icons used in fallback data + common ones from admin
// This avoids importing ALL 1000+ lucide icons (595 KB → ~15 KB)
import {
  Globe, Bot, Palette, Briefcase,
  Sparkles, Terminal, Code2, Zap, Layout, Layers, GitBranch, Search,
  GraduationCap, Award, Heart, Shield, Smartphone, Database,
  Server, Cloud, Lock, Settings, Star, Rocket, Users, FileCode,
  Monitor, Wifi, Coffee, Package, Cpu, HardDrive, Wrench, PenTool,
} from 'lucide-react';

const iconMap = {
  Globe, Bot, Palette, Briefcase,
  Sparkles, Terminal, Code2, Zap, Layout, Layers, GitBranch, Search,
  GraduationCap, Award, Heart, Shield, Smartphone, Database,
  Server, Cloud, Lock, Settings, Star, Rocket, Users, FileCode,
  Monitor, Wifi, Coffee, Package, Cpu, HardDrive, Wrench, PenTool,
};

export function getIcon(name, fallbackName = 'Code2') {
  return iconMap[name] || iconMap[fallbackName] || Code2;
}

export default iconMap;
