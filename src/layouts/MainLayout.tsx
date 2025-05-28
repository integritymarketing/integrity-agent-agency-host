import { Outlet } from "react-router-dom";

/**
 * MainLayout is a wrapper component for all routes that should share a common layout,
 * such as a header, footer, or sidebar. Any route nested under a <Route element={<MainLayout />}>
 * in your AppRoutes will be rendered inside the <Outlet /> below.
 *
 * Example usage in AppRoutes:
 * 
 * <Route element={<MainLayout />}>
 *   <Route path="/dashboard" element={<DashboardPage />} />
 *   <Route path="/contact" element={<ContactPage />} />
 * </Route>
 * 
 * This ensures that both /dashboard and /contact will be rendered inside MainLayout,
 * sharing the same layout structure.
 */

const MainLayout: React.FC = () => (
  <>
    {/* You can add <Header /> or <Footer /> here if needed */}
    <main>
      <Outlet />
    </main>
  </>
);

export default MainLayout;