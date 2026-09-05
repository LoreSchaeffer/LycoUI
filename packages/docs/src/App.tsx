import './App.scss';
import React, {Suspense, useEffect, useMemo, useState} from 'react';
import {BrowserRouter, Navigate, NavLink, Route, Routes, useLocation} from 'react-router';
import clsx from "clsx";
import {PiBookBold, PiBookOpenBold} from "react-icons/pi";
import {docsNavigation, flattenedRoutes} from "./routes/auto-discovery.ts";
import {Navbar, NotificationProvider, Sidebar} from '@loreschaeffer/lyco-ui';

const RouterSidebarLink = Sidebar.Link as unknown as React.FC<React.ComponentProps<typeof Sidebar.Link> & { to: string }>;

const DocsLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMobile) setIsSidebarOpen(false);
        if (location.hash) {
            const id = location.hash.substring(1);
            let attempts = 0;
            const scrollInterval = setInterval(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({behavior: 'smooth'});
                    clearInterval(scrollInterval);
                }
                attempts++;
                if (attempts > 15) clearInterval(scrollInterval);
            }, 100);
        } else {
            window.scrollTo(0, 0);
            document.querySelector('.docs-content')?.scrollTo(0, 0);
        }
    }, [location.pathname, location.hash, isMobile]);

    const processedNavigation = useMemo(() => {
        return docsNavigation.map(category => ({
            ...category,
            items: category.sorted
                ? [...category.items].sort((a, b) => a.name.localeCompare(b.name))
                : category.items
        }));
    }, []);

    return (
        <div className="docs-layout">
            {isMobile && (
                <Navbar expand="never" className="docs-mobile-navbar" position="sticky" elevation="1">
                    <Navbar.Brand>Lyco UI</Navbar.Brand>
                    <Navbar.Toggle onClick={() => setIsSidebarOpen(true)}/>
                </Navbar>
            )}

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                variant={isMobile ? 'overlay' : 'fixed'}
                className="docs-sidebar"
            >
                <Sidebar.Header>
                    <span className="docs-sidebar__logo">Lyco UI</span>
                </Sidebar.Header>

                <Sidebar.Content>
                    <Sidebar.Nav>
                        {processedNavigation.map((category) => {
                            const Icon = category.icon;

                            return (
                                <React.Fragment key={category.title}>
                                    <div className="docs-sidebar__section-title">
                                        {Icon && <Icon/>}
                                        {category.title}
                                    </div>
                                    {category.items.map((item) => {
                                        const isActive = location.pathname === item.path;
                                        return (
                                            <Sidebar.Item key={item.path}>
                                                <RouterSidebarLink
                                                    as={NavLink}
                                                    to={item.path}
                                                    active={isActive}
                                                    icon={isActive ? <PiBookOpenBold style={{opacity: 0.7}}/> : <PiBookBold style={{opacity: 0.7}}/>}
                                                >
                                                    {item.name}
                                                </RouterSidebarLink>
                                                {item.subItems && isActive && (
                                                    <ul className="docs-sidebar__subitems">
                                                        {item.subItems.map(subItem => (
                                                            <li key={subItem.hash}>
                                                                <NavLink
                                                                    className={() => clsx('docs-sidebar__sub-link', location.hash === subItem.hash && 'active')}
                                                                    to={`${item.path}${subItem.hash}`}
                                                                >
                                                                    {subItem.name}
                                                                </NavLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </Sidebar.Item>
                                        );
                                    })}
                                </React.Fragment>
                            );
                        })}
                    </Sidebar.Nav>
                </Sidebar.Content>
            </Sidebar>

            <main className="docs-content">
                <Suspense fallback={<div style={{color: 'var(--color-text-muted)'}}>Loading page...</div>}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/docs/introduction" replace/>}/>

                        {flattenedRoutes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<route.component/>}
                            />
                        ))}
                    </Routes>
                </Suspense>
            </main>
        </div>
    );
};

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <NotificationProvider>
                <DocsLayout/>
            </NotificationProvider>
        </BrowserRouter>
    );
};
