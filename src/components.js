/**
 * Created by Roman on 11.08.2017.
 */

import VuePrismEditor from "vue-prism-editor";
import "vue-prism-editor/dist/VuePrismEditor.css"; // import the styles

export default function (Vue) {
    Vue.component(
        'prism-editor',
        VuePrismEditor
    );
}


