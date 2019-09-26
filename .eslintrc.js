module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true
	},
	extends: ["airbnb"],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parser: "babel-eslint",
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: "module"
	},
	plugins: ["react", "import", "react-hooks"],
	rules: {
    "no-underscore-dangle": "off",
    "react/forbid-prop-types": "off"
	}
};
