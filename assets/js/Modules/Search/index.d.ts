/// <reference types="jquery" />
/// <reference types="src/_types/main" />
declare const _default: {
    opts: {
        inited: number;
        appendClass: string;
        processing: string;
        processed: string;
        noResults: string;
        hasErrors: string;
    };
    els: {
        $search: any;
        $input: any;
        $form: any;
        $bg: any;
        $bgSlot: any;
        $searchResultsContainer: any;
        $searchBy: any;
        $searchErrors: any;
        $advancedOptions: any;
    };
    init: (_$: typeof jQuery) => void;
    methods: {
        initSearchBy(): void;
        loadBackdrop(): void;
        onClose(): void;
        toggleChecked(e: any): void;
        onSubmit(e: any): void;
        triggerProcessing(loading: boolean, loaded: boolean): void;
        validateSearch(data: any): any[];
        resultsLoaded(res: string): void;
    };
};
export default _default;
