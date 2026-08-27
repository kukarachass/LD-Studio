import type {ReactNode} from "react";
import {cn} from "@/lib/utils";

/**
 * Розкриття блока без анімації height.
 *
 * Анімується `grid-template-rows: 0fr → 1fr` — браузер рахує це сам,
 * JS у кадрах участі не бере. Прозорість винесена на внутрішній шар:
 * якщо анімувати opacity на тому ж елементі, що змінює розмір, браузер
 * змушений виносити всю панель в окремий шар на кожному кроці.
 *
 * Клас навмисно НЕ називається `collapse`: у Tailwind уже є вбудована
 * утиліта `.collapse { visibility: collapse }`, і збіг назв робив вміст
 * невидимим.
 */
export function Disclosure({
                               open,
                               id,
                               children,
                               className,
                           }: {
    open: boolean;
    id?: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <div id={id} data-open={open} className={cn("disclosure", className)}>
            {/* Обгортка обов'язкова: саме її висоту стискає нульовий рядок сітки */}
            <div>
                <div className="disclosure-inner">{children}</div>
            </div>
        </div>
    );
}