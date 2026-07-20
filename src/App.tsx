import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "./components/AppShell";
import Dashboard from "./components/Dashboard";
import Onboarding from "./components/screens/Onboarding";
import GroupCreation from "./components/screens/GroupCreation";
import MemberInvite from "./components/screens/MemberInvite";
import FundingScreen from "./components/screens/FundingScreen";
import GroupDetail from "./components/screens/GroupDetail";
import GuaranteeVaultScreen from "./components/screens/GuaranteeVaultScreen";
import PadiPassport from "./components/screens/PadiPassport";
import Notifications from "./components/screens/Notifications";
import Settings from "./components/screens/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/" element={<AppShell><Dashboard /></AppShell>} />
        <Route path="/groups" element={<AppShell><GroupDetail /></AppShell>} />
        <Route path="/groups/new" element={<AppShell><GroupCreation /></AppShell>} />
        <Route path="/invite" element={<AppShell><MemberInvite /></AppShell>} />
        <Route path="/fund" element={<AppShell><FundingScreen /></AppShell>} />
        <Route path="/vault" element={<AppShell><GuaranteeVaultScreen /></AppShell>} />
        <Route path="/passport" element={<AppShell><PadiPassport /></AppShell>} />
        <Route path="/notifications" element={<AppShell><Notifications /></AppShell>} />
        <Route path="/settings" element={<AppShell><Settings /></AppShell>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;