import React, { useState, useRef, useEffect } from "react"
import { Globe } from "lucide-react"

const languages = [
	{ code: "en", label: "English" }, // Add this as the first/default
	{ code: "hi", label: "हिन्दी (Hindi)" },
	{ code: "bn", label: "বাংলা (Bengali)" },
	{ code: "te", label: "తెలుగు (Telugu)" },
	{ code: "mr", label: "मराठी (Marathi)" },
	{ code: "ta", label: "தமிழ் (Tamil)" },
	{ code: "gu", label: "ગુજરાતી (Gujarati)" },
	{ code: "ur", label: "اردو (Urdu)" },
	{ code: "kn", label: "ಕನ್ನಡ (Kannada)" },
	{ code: "or", label: "ଓଡ଼ିଆ (Odia)" },
	{ code: "ml", label: "മലയാളം (Malayalam)" },
	{ code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
]

type LanguageDropdownProps = {
	className?: string
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ className }) => {
	const [open, setOpen] = useState(false)
	const [selected, setSelected] = useState(languages[0]) // This will now be English
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	return (
		<div className={`relative`} ref={ref}>
			<button
				className={`flex items-center rounded-full px-4 py-2 text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow transition ${className ?? ""}`}
				onClick={() => setOpen((o) => !o)}
				type="button"
			>
				<Globe className="w-4 h-4 mr-2" />
				{selected.label}
				<svg
					className="ml-2 w-4 h-4"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
			{open && (
				<div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200 animate-fade-in">
					<div className="custom-scrollbar max-h-64 overflow-y-auto py-1">
						{languages.map((lang) => (
							<div
								key={lang.code}
								className="language-option flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 cursor-pointer"
								onClick={() => {
									setSelected(lang)
									setOpen(false)
									// Optionally: trigger language change here
								}}
								data-lang={lang.code}
							>
								<span>{lang.label}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default LanguageDropdown