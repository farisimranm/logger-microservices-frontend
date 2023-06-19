import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuditLogDashboardPage from "../components/pages/AuditLogDashboardPage";
import AuditLogDetailsPage from "../components/pages/AuditLogDetailsPage";
import NotFoundPage from "../components/pages/NotFoundPage";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/audit" element={<AuditLogDashboardPage />} />
                <Route path="audit/:id" element={<AuditLogDetailsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default AppRouter;