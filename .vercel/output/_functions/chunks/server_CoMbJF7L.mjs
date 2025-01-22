import { c as createInvalidVariablesError, s as setOnSetGetEnv, g as getEnv$1 } from './runtime_uolrfPH-.mjs';

const schema = {"GITHUB_TOKEN":{"context":"server","access":"secret","type":"string"},"GOOGLE_API_KEY":{"context":"server","access":"secret","type":"string"},"NEXT_PUBLIC_VERCEL_URL":{"context":"client","access":"public","type":"string"}};

function getEnvFieldType(options) {
  const optional = options.optional ? options.default !== undefined ? false : true : false;
  let type;
  if (options.type === "enum") {
    type = options.values.map((v) => `'${v}'`).join(" | ");
  } else {
    type = options.type;
  }
  return `${type}${optional ? " | undefined" : ""}`;
}
const stringValidator = ({ max, min, length, url, includes, startsWith, endsWith }) => (input) => {
  if (typeof input !== "string") {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  const errors = [];
  if (max !== undefined && !(input.length <= max)) {
    errors.push("max");
  }
  if (min !== undefined && !(input.length >= min)) {
    errors.push("min");
  }
  if (length !== undefined && !(input.length === length)) {
    errors.push("length");
  }
  if (url !== undefined && !URL.canParse(input)) {
    errors.push("url");
  }
  if (includes !== undefined && !input.includes(includes)) {
    errors.push("includes");
  }
  if (startsWith !== undefined && !input.startsWith(startsWith)) {
    errors.push("startsWith");
  }
  if (endsWith !== undefined && !input.endsWith(endsWith)) {
    errors.push("endsWith");
  }
  if (errors.length > 0) {
    return {
      ok: false,
      errors
    };
  }
  return {
    ok: true,
    value: input
  };
};
const numberValidator = ({ gt, min, lt, max, int }) => (input) => {
  const num = parseFloat(input ?? "");
  if (isNaN(num)) {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  const errors = [];
  if (gt !== undefined && !(num > gt)) {
    errors.push("gt");
  }
  if (min !== undefined && !(num >= min)) {
    errors.push("min");
  }
  if (lt !== undefined && !(num < lt)) {
    errors.push("lt");
  }
  if (max !== undefined && !(num <= max)) {
    errors.push("max");
  }
  if (int !== undefined) {
    const isInt = Number.isInteger(num);
    if (!(int ? isInt : !isInt)) {
      errors.push("int");
    }
  }
  if (errors.length > 0) {
    return {
      ok: false,
      errors
    };
  }
  return {
    ok: true,
    value: num
  };
};
const booleanValidator = (input) => {
  const bool = input === "true" ? true : input === "false" ? false : undefined;
  if (typeof bool !== "boolean") {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  return {
    ok: true,
    value: bool
  };
};
const enumValidator = ({ values }) => (input) => {
  if (!(typeof input === "string" ? values.includes(input) : false)) {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  return {
    ok: true,
    value: input
  };
};
function selectValidator(options) {
  switch (options.type) {
    case "string":
      return stringValidator(options);
    case "number":
      return numberValidator(options);
    case "boolean":
      return booleanValidator;
    case "enum":
      return enumValidator(options);
  }
}
function validateEnvVariable(value, options) {
  const isOptional = options.optional || options.default !== undefined;
  if (isOptional && value === undefined) {
    return {
      ok: true,
      value: options.default
    };
  }
  if (!isOptional && value === undefined) {
    return {
      ok: false,
      errors: ["missing"]
    };
  }
  return selectValidator(options)(value);
}

// @ts-check

// @ts-expect-error
/** @returns {string} */
// used while generating the virtual module
// biome-ignore lint/correctness/noUnusedFunctionParameters: `key` is used by the generated code
// biome-ignore lint/correctness/noUnusedVariables: `key` is used by the generated code
const getEnv = (key) => {
	return getEnv$1(key);
};

const _internalGetSecret = (key) => {
	const rawVariable = getEnv(key);
	const variable = rawVariable === '' ? undefined : rawVariable;
	const options = schema[key];

	const result = validateEnvVariable(variable, options);
	if (result.ok) {
		return result.value;
	}
	const type = getEnvFieldType(options);
	throw createInvalidVariablesError(key, type, result);
};

setOnSetGetEnv(() => {
	GITHUB_TOKEN = _internalGetSecret("GITHUB_TOKEN");
GOOGLE_API_KEY = _internalGetSecret("GOOGLE_API_KEY");

});
let GITHUB_TOKEN = _internalGetSecret("GITHUB_TOKEN");
let GOOGLE_API_KEY = _internalGetSecret("GOOGLE_API_KEY");

export { GOOGLE_API_KEY as G, GITHUB_TOKEN as a };
