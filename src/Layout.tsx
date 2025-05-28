// Layout.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@integritymarketing/clients-ui-kit/dist/components/Header/Header";
import SideNav from "@integritymarketing/clients-ui-kit/dist/components/SideNav/SideNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileContract, faSignOut } from "@awesome.me/kit-7ab3488df1/icons/sharp/solid";
import { faUserAccount } from "@awesome.me/kit-7ab3488df1/icons/kit/custom";
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
import useAgentProfile from './hooks/useAgentProfile';
import { useAgentAvailability } from './contexts';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const { data, error, refetch, toggleAvailability } = useAgentAvailability();
    const profile = useAgentProfile();

    useEffect(() => {
        refetch().then(r => r);
    }, []);

    const handleAvailabilityChange = async () => {
        if (data) {
            try {
                await toggleAvailability(!data.isAvailable);
            } catch (error) {
                console.error('Failed to toggle availability:', error);
            }
        }
    };

    const navItems = [
        { key: "dashboard", label: "Dashboard", icon: faTableColumns, onClick: () => navigate('/dashboard') },
        { key: "agents", label: "Agents", icon: faUser, onClick: () => navigate('/agents') },
        { key: "production", label: "Production", icon: faChartPie, onClick: () => navigate('/production') },
        { key: "marketing", label: "Marketing", icon: faBullhorn, onClick: () => navigate('/marketing') },
        { key: "commissions", label: "Commissions", icon: faMoneyBillTransfer, onClick: () => navigate('/commissions') },
        { key: "contracts", label: "Contracts", icon: faFileSignature, onClick: () => navigate('/contracts') },
        { key: "reports", label: "Reports", icon: faChartLine, onClick: () => navigate('/reports') },
        { key: "learning", label: "Learning", icon: faBook, onClick: () => navigate('/learning') },
        { key: "admin", label: "Admin", icon: faGear, onClick: () => navigate('/admin') },
    ];

    const profileName = profile?.firstName && profile?.lastName 
        ? `${profile.firstName} ${profile.lastName}`
        : "Guest User";

    // Default to false if there's an error or no data
    const isAvailable = error ? false : (data?.isAvailable ?? false);

    return (
        <div className="app-container">
            <Header
                isAvailable={isAvailable}
                showAvailability={!error} // Hide availability toggle if there's an error
                onAvailabilityChange={handleAvailabilityChange}
                createNewMenuOptions={[
                    {
                        label: "Edit Profile",
                        onClick: () => navigate('/profile/edit'),
                        disabled: false,
                        icon: <FontAwesomeIcon icon={faEdit} />,
                    },
                    {
                        label: "Delete Profile",
                        onClick: () => navigate('/profile/delete'),
                        disabled: false,
                        icon: <FontAwesomeIcon icon={faUser} />,
                    },
                ]}
                profileMenuOptions={[
                    {
                        label: "Account",
                        onClick: () => navigate('/account'),
                        disabled: false,
                        icon: <FontAwesomeIcon icon={faUserAccount} />,
                    },
                    {
                        label: "Contracts",
                        onClick: () => navigate('/contracts'),
                        icon: <FontAwesomeIcon icon={faFileContract} />,
                    },
                    {
                        label: "Logout",
                        onClick: () => navigate('/logout'),
                        disabled: false,
                        icon: <FontAwesomeIcon icon={faSignOut} />,
                    },
                ]}
                profileName={profileName}
                profileImageUrl=""
            />
            <div className="main-content">
                <SideNav
                    navItems={navItems}
                    recentProfiles={[{
                        name: "Jennifer Patel",
                        imageUrl: "",
                        onClick: () => navigate('/profile/jennifer'),
                    }]}
                    footerText={"©2025 Integrity. All rights reserved."}
                />
                <div className="content-container">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;