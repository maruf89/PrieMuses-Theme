/// <reference types="jquery" />
/// <reference types="src/_types/main" />
declare const _default: {
    opts: {
        inited: number;
        appendClass: string;
        processing: string;
        processed: string;
        noResults: string;
    };
    els: {
        $search: any;
        $input: any;
        $form: any;
        $bg: any;
        $bgSlot: any;
        $searchResultsContainer: any;
    };
    init: (_$: typeof jQuery) => void;
    methods: {
        loadBackdrop: () => void;
        onClose: () => void;
        onSubmit: (e: any) => void;
        triggerProcessing: (loading: boolean, loaded: boolean) => void;
        validateSearch: (data: any) => any[];
        resultsLoaded: (res: string) => void;
    };
};
export default _default;
