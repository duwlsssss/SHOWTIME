export type ToggleButtonState = {
	$isVisible: boolean;
};

export type LeftSectionState = {
	$isExpanded: boolean;
};

export type RightSectionState = {
	$isCollapsed: boolean;
};

export const TOGGLE_BUTTON_TEXT = {
	EXPAND: '>>',
	COLLAPSE: '<<',
} as const;

export type ToggleButtonTextType = (typeof TOGGLE_BUTTON_TEXT)[keyof typeof TOGGLE_BUTTON_TEXT];
