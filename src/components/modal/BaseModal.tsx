"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import {
    createContext,
    useContext,
    type ReactNode,
    type MouseEvent,
} from "react";

const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    full: "max-w-full",
} as const;

type MaxWidth = keyof typeof maxWidthClasses;

interface BaseModalContextValue {
    onClose?: () => void;
}

const BaseModalContext = createContext<BaseModalContextValue>({});

function useBaseModalContext() {
    return useContext(BaseModalContext);
}

export interface BaseModalProps {
    open?: boolean;
    onClose?: () => void;
    children: ReactNode;
    /** Extra classes on the glass panel */
    className?: string;
    maxWidth?: MaxWidth;
    zIndex?: number;
    showCloseButton?: boolean;
    closeOnBackdropClick?: boolean;
    /** Enables max-h-[85vh] overflow on the panel */
    scrollable?: boolean;
}

export function BaseModal({
    open = true,
    onClose,
    children,
    className = "",
    maxWidth = "2xl",
    zIndex = 100,
    showCloseButton,
    closeOnBackdropClick = true,
    scrollable = false,
}: BaseModalProps) {
    const shouldShowClose = showCloseButton ?? Boolean(onClose);

    const handleBackdropClick = () => {
        if (closeOnBackdropClick) onClose?.();
    };

    const handlePanelClick = (e: MouseEvent) => e.stopPropagation();

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="base-modal-root"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 flex items-center justify-center p-4"
                    style={{ zIndex }}
                    onClick={handleBackdropClick}
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80 backdrop-blur-xl"
                    />

                    {/* Ambient glow */}
                    <div
                        className="pointer-events-none absolute inset-0 overflow-hidden"
                        aria-hidden
                    >
                        <div className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
                        <div className="absolute bottom-0 right-1/4 h-40 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
                    </div>

                    {/* Glass panel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 24 }}
                        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                        onClick={handlePanelClick}
                        className={[
                            "relative w-full overflow-hidden rounded-3xl",
                            "border border-white/20",
                            "bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.03]",
                            "shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]",
                            "backdrop-blur-2xl backdrop-saturate-150",
                            maxWidthClasses[maxWidth],
                            scrollable ? "max-h-[85vh] overflow-y-auto custom-scrollbar" : "",
                            className,
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        {/* Top shine */}
                        <div
                            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            aria-hidden
                        />

                        {shouldShowClose && onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="absolute left-4 top-4 z-20 cursor-pointer rounded-full p-2 text-white/50 transition-all duration-150 hover:bg-white/15 hover:text-white active:scale-95"
                                aria-label="بستن"
                            >
                                <IoClose className="h-5 w-5" />
                            </button>
                        )}

                        <BaseModalContext.Provider value={{ onClose }}>
                            {children}
                        </BaseModalContext.Provider>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

interface BaseModalHeaderProps {
    title: ReactNode;
    subtitle?: ReactNode;
    badge?: ReactNode;
    className?: string;
    /** Extra top padding when close button is visible (default true) */
    withCloseOffset?: boolean;
}

function BaseModalHeader({
    title,
    subtitle,
    badge,
    className = "",
    withCloseOffset = true,
}: BaseModalHeaderProps) {
    return (
        <div
            className={[
                "flex items-start justify-between gap-4 border-b border-white/10",
                "bg-gradient-to-r from-white/10 via-white/5 to-transparent px-6 pb-4",
                withCloseOffset ? "pt-12" : "pt-6",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className="min-w-0 flex-1 space-y-1 text-right">
                <h2 className={`text-lg font-semibold text-white md:text-xl ${className}`}>{title}</h2>
                {subtitle && (
                    <p className={`text-xs text-white/55 md:text-sm ${className}`}>{subtitle}</p>
                )}
            </div>
            {badge && <div className="shrink-0">{badge}</div>}
        </div>
    );
}

interface BaseModalBodyProps {
    children: ReactNode;
    className?: string;
}

function BaseModalBody({ children, className = "" }: BaseModalBodyProps) {
    return (
        <div className={`px-4 py-4 sm:px-6 md:py-5 ${className}`}>{children}</div>
    );
}

interface BaseModalFooterProps {
    children: ReactNode;
    className?: string;
}

function BaseModalFooter({ children, className = "" }: BaseModalFooterProps) {
    return (
        <div
            className={`flex justify-end gap-3 px-6 py-4 ${className}`}
        >
            {children}
        </div>
    );
}

BaseModal.Header = BaseModalHeader;
BaseModal.Body = BaseModalBody;
BaseModal.Footer = BaseModalFooter;

export { useBaseModalContext };
