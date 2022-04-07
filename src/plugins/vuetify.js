import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';


Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: "#006643",
				secondary: "#bcbec0",
				accent: "#bcbec0",
				error: "#772432",
				warning: "#b88b00",
			},
		},
	},
});
