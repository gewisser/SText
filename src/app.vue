//
Created by Roman on 10.08.2017.
app.vue

<template lang="pug">
    #app
        prism-editor(v-model="text", :language="language", :line-numbers="true", style="height: 100%;")

</template>

<script>
    import '@/images/mainicon.png'

    export default {
        name: 'app',
        data () {
            return {
                text: '',
                language: 'md'
            }
        },
        created(){
            window.bus.$on(window.ON_SELECT_FILE, async (args) => {
                if (!args || args.canceled)
                    return;

                if (args.filePaths.length === 0)
                    return;

                let filePath = args.filePaths[0];

                //console.log(filePath);

                let extArray = filePath.match(/\.\w+?$/img);

                if (extArray.length > 0) {
                    switch (extArray[0]) {
                        case '.js':
                            this.language = 'js';
                            break;
                        case '.php':
                            this.language = 'php';
                            break;
                        case '.go':
                            this.language = 'go';
                            break;
                        case '.sql':
                            this.language = 'sql';
                            break;
                        case '.ini':
                            this.language = 'ini';
                            break;
                        case '.css':
                            this.language = 'css';
                            break;
                        case '.ino':
                            this.language = 'arduino';
                            break;
                        case '.c':
                            this.language = 'c';
                            break;
                        case '.cpp':
                            this.language = 'cpp';
                            break;
                        case '.pug':
                            this.language = 'pug';
                            break;
                        case '.sas':
                            this.language = 'sas';
                            break;
                        case '.sass':
                            this.language = 'sass';
                            break;
                        case '.scss':
                            this.language = 'scss';
                            break;
                        case '.ts':
                            this.language = 'ts';
                            break;
                        case '.jsx':
                            this.language = 'jsx';
                            break;
                        case '.tsx':
                            this.language = 'tsx';
                            break;
                        case '.json':
                            this.language = 'json';
                            break;
                        case '.vue':
                            this.language = 'js';
                            break;
                         default:
                             this.language = 'md';
                    }
                }

                this.text = await window.readFile(filePath, "utf-8");
            });
        }
    }
</script>