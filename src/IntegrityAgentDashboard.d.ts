
type DashboardProps = object

declare module "IntegrityAgentDashboard/Dashboard" {
    import { ComponentType } from "react";
    const Dashboard: ComponentType<DashboardProps>;
    export default Dashboard;
}

declare module "IntegrityAgentDashboard/MainRouters" {
    import { ComponentType } from "react";
    const MainRouters: ComponentType<MainRoutersProps>;
    export default MainRouters;
}