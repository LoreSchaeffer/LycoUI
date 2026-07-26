import './App.scss';
import React, {Suspense, useEffect, useMemo, useState} from 'react';
import {BrowserRouter, Navigate, NavLink, Route, Routes, useLocation} from 'react-router';
import {FiMenu, FiX} from 'react-icons/fi';
import clsx from "clsx";
import {PiBookBold, PiBookOpenBold} from "react-icons/pi";
import {docsNavigation, flattenedRoutes} from "./routes/auto-discovery.ts";

const DocsLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

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
            <header className="docs-mobile-header">
                <button
                    className="docs-menu-btn"
                    onClick={() => setIsSidebarOpen(true)}
                    aria-label="Open documentation menu"
                >
                    <FiMenu/>
                </button>
                <span className="docs-mobile-title">Lyco UI Docs</span>
            </header>

            {isSidebarOpen && (
                <div
                    className="docs-backdrop"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            <aside className={`docs-sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
                <div className="docs-sidebar__header">
                    <span className="docs-sidebar__logo">Lyco UI</span>
                    <button
                        className="docs-close-btn"
                        onClick={() => setIsSidebarOpen(false)}
                        aria-label="Close menu"
                    >
                        <FiX/>
                    </button>
                </div>

                <nav className="docs-sidebar__nav">
                    {processedNavigation.map((category) => {
                        const Icon = category.icon;

                        return (
                            <div key={category.title}>
                                <h4 className="docs-sidebar__section-title">
                                    <Icon/>
                                    {category.title}
                                </h4>
                                <ul className="docs-sidebar__section-items">
                                    {category.items.map((item) => (
                                        <li key={item.path}>
                                            <NavLink
                                                className={({isActive}) =>
                                                    clsx('docs-sidebar__nav-link', isActive && 'active')
                                                }
                                                to={item.path}
                                            >
                                                {({isActive}) => (
                                                    <>
                                                        {isActive
                                                            ? <PiBookOpenBold style={{opacity: 0.7}}/>
                                                            : <PiBookBold style={{opacity: 0.7}}/>
                                                        }
                                                        {item.name}
                                                    </>
                                                )}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </nav>
            </aside>

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
            <DocsLayout/>
        </BrowserRouter>
    );
};