import { HeadersTable } from "@/components/ui/headersTable";
import type { SecretVar } from "@/lib/types/mcp";
import type { FieldError } from "react-hook-form";

type HeaderPair<T> = { name: string; value: T };
type PairErrors = { name?: FieldError; value?: FieldError } | undefined;

/**
 * The relay forms keep headers as name/value pairs (so the schema can flag a half-filled row);
 * this edits them through the shared headers table and lists the per-row errors below it.
 */
export function HeaderPairsTable<T extends string | SecretVar>({
	value,
	onChange,
	errors,
	keyPlaceholder,
	valuePlaceholder,
	disabled,
	useSecretVarInput,
	testIdPrefix,
}: {
	value: HeaderPair<T>[];
	onChange: (pairs: HeaderPair<T>[]) => void;
	errors?: unknown;
	keyPlaceholder?: string;
	valuePlaceholder?: string;
	disabled?: boolean;
	useSecretVarInput?: boolean;
	testIdPrefix?: string;
}) {
	const messages = Array.isArray(errors)
		? [...new Set((errors as PairErrors[]).flatMap((e) => [e?.name?.message, e?.value?.message]).filter((m): m is string => !!m))]
		: [];
	return (
		<div className="space-y-2">
			<HeadersTable<T>
				label=""
				value={Object.fromEntries(value.map((h) => [h.name, h.value]))}
				onChange={(record) => onChange(Object.entries(record).map(([name, v]) => ({ name, value: v })))}
				keyPlaceholder={keyPlaceholder}
				valuePlaceholder={valuePlaceholder}
				disabled={disabled}
				useSecretVarInput={useSecretVarInput}
				testIdPrefix={testIdPrefix}
			/>
			{messages.map((m) => (
				<p key={m} className="text-destructive text-sm">
					{m}
				</p>
			))}
		</div>
	);
}