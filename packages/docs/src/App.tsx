import './App.scss';
import React, {Suspense, useEffect, useState} from 'react';
import {BrowserRouter, Navigate, NavLink, Route, Routes, useLocation} from 'react-router';
import {docsNavigation, flattenedRoutes} from './routes/docsRoutes';
import {FiMenu, FiX} from 'react-icons/fi';
import clsx from "clsx";
import {PiBookBold, PiBookOpenBold} from "react-icons/pi";

const DocsLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    return (
        <div className="lyco-docs-layout">
            <header className="lyco-docs-mobile-header">
                <button
                    className="lyco-docs-menu-btn"
                    onClick={() => setIsSidebarOpen(true)}
                    aria-label="Open documentation menu"
                >
                    <FiMenu/>
                </button>
                <span className="lyco-docs-mobile-title">Lyco UI Docs</span>
            </header>

            {isSidebarOpen && (
                <div
                    className="lyco-docs-backdrop"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            <aside className={`lyco-docs-sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
                <div className="lyco-docs-sidebar__header">
                    <span className="lyco-docs-sidebar__logo">Lyco UI</span>
                    <button
                        className="lyco-docs-close-btn"
                        onClick={() => setIsSidebarOpen(false)}
                        aria-label="Close menu"
                    >
                        <FiX/>
                    </button>
                </div>

                <nav className="lyco-docs-sidebar__nav">
                    {docsNavigation.map((category) => {
                        const Icon = category.icon;

                        return (
                            <div key={category.title}>
                                <h4 className="lyco-docs-sidebar__section-title">
                                    <Icon/>
                                    {category.title}
                                </h4>
                                <ul className="lyco-docs-sidebar__section-items">
                                    {category.items.map((item) => (
                                        <li key={item.path}>
                                            <NavLink
                                                className={
                                                    ({isActive}) =>
                                                        clsx('lyco-docs-sidebar__nav-link', isActive && 'active')
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
                        )
                    })}
                </nav>
            </aside>

            <main className="lyco-docs-content">
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