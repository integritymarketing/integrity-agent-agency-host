import Header from "@integritymarketing/clients-ui-kit/dist/components/Header/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faFileContract, faSignOut} from "@awesome.me/kit-7ab3488df1/icons/sharp/solid";
import {faUserAccount} from "@awesome.me/kit-7ab3488df1/icons/kit/custom";
import {useAgentAvailability} from "../contexts/agentAvailabilityProvider/AgentAvailabilityContext";
import {useAgentProfile} from "@/contexts";
import SideNav from "@integritymarketing/clients-ui-kit/dist/components/SideNav/SideNav";
import {
    faBook,
    faBullhorn,
    faChartLine,
    faChartPie,
    faFileSignature,
    faGear,
    faMoneyBillTransfer,
    faTableColumns,
    faUser,
} from "@awesome.me/kit-7ab3488df1/icons/duotone/solid";

const TestPage = () => {
    const {data: availability, loading: availabilityLoading, toggleAvailability} = useAgentAvailability();
    const {data: profile, loading: profileLoading} = useAgentProfile();

    const handleAvailabilityChange = async () => {
        if (availability) {
            await toggleAvailability(!availability.isAvailable);
        }
    };

    if (availabilityLoading || profileLoading) {
        return <div>Loading...</div>;
    }

    const navItems = [
        {key: "dashboard", label: "Dashboard", icon: faTableColumns},
        {key: "agents", label: "Agents", icon: faUser},
        {key: "production", label: "Production", icon: faChartPie},
        {key: "marketing", label: "Marketing", icon: faBullhorn},
        {key: "commissions", label: "Commissions", icon: faMoneyBillTransfer},
        {key: "contracts", label: "Contracts", icon: faFileSignature},
        {key: "reports", label: "Reports", icon: faChartLine},
        {key: "learning", label: "Learning", icon: faBook},
        {key: "admin", label: "Admin", icon: faGear},
    ];

    return (
        <>
            <Header
                isAvailable={availability?.isAvailable ?? false}
                showAvailability={true}
                onAvailabilityChange={handleAvailabilityChange}
                createNewMenuOptions={[
                    {
                        label: "Edit Profile",
                        onClick: () => alert("Edit clicked"),
                        disabled: false,
                        icon: <FontAwesomeIcon icon={faEdit}/>,
                    },
                    {
                        label: "Delete Profile",
                        onClick: () => alert("Delete clicked"),
                        disabled: false,
                        icon: <FontAwesomeIcon icon={faUser}/>,
                    },
                ]}
                profileMenuOptions={[
                    {
                        label: "Account",
                        onClick: () => alert("Account clicked"),
                        disabled: false,
                        icon: <FontAwesomeIcon icon={faUserAccount}/>,
                    },
                    {
                        label: "Contracts",
                        onClick: () => alert("Contracts clicked"),
                        icon: <FontAwesomeIcon icon={faFileContract}/>,
                    },
                    {
                        label: "Logout",
                        onClick: () => alert("Logout clicked"),
                        disabled: false,
                        icon: <FontAwesomeIcon icon={faSignOut}/>,
                    },
                ]}
                profileName={`${profile?.agentFirstName || ''} ${profile?.agentLastName || ''}`}
                profileImageUrl={profile?.profileImageUrl || ''}
            />
            <SideNav
                navItems={navItems}
                recentProfiles={[{
                    name: "Jennifer Patel",
                    imageUrl: "",
                    onClick: () => {
                    },
                }]}
                footerText={"©2025 Integrity. All rights reserved."}/>
        </>
    );
};

export default TestPage;
