<template>
    <div class="container text-center" ref="page">
        <button type="submit" class="btn btn-primary" v-on:click="Download">Descargar</button>
    </div>
</template>

<script>

    import axios from "axios";
    import { useStore } from '@/state';

    export default {
        name: "Descarga",
        methods: {
            Download: function() {
                axios
                    .get(this.store.state.backURL + "/descarga/labor").then((result) => {
                        console.log(result)
                        
                    }).catch((err) => {
                        console.log(result)
                    });
            }
        },
        setup() {
            const store = useStore();
            return { store};
        },
    };

</script>