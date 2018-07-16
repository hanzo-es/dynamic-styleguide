/**
 * Go through an abstract syntax tree and find in breath, from left to right
 * getting the node(s) that match a defined type. `maxDeep` defines how deep
 * this function should search. If there is an error, `null` is returned.
 *
 * @param   {Object}      tree              The defined AST
 * @param   {String}      type              The type to filter out
 * @param   {Number}      maxDeep
 * @default 1
 * @param   {Boolean}     returnFirstMatch
 * @returns {Object|null}
 */
const breadthSearchByType = (tree, type, maxDeep = 1, returnFirstMatch) => {
  try {
    const stack = [];
    let node = null;
    const matchedNodes = [];
    let deepLevel = maxDeep;
    stack.push(...tree.content);

    while (stack.length > 0) {
      node = stack.shift(); // From left to right. Use `pop` otherwise
      if (node.type === type) {
        if (returnFirstMatch) {
          return node;
        }
        matchedNodes.push(node);
      } else if (Array.isArray(node.content) && deepLevel > 1) {
        deepLevel--;
        stack.push(...node.content);
      }
    }
    return matchedNodes;
  } catch(e) {
    return null;
  }
};

const breadthSearchFirstByType = (tree, type, maxDeep) => {
  return breadthSearchByType(tree, type, maxDeep, true);
};
const breadthSearchAllByType = (tree, type, maxDeep) => {
  return breadthSearchByType(tree, type, maxDeep, false);
};

const findFirstNodeInDepth = (parentNode, deepPath) => {
  return deepPath.reduce((acc, nodeType) => {
    return breadthSearchFirstByType(acc, nodeType);
  }, parentNode);
};

/**
 * Search in all the children with 'declarations' types of a AST and returns the
 * one which name match with `varName`
 *
 * @param   {Object}      ast
 * @param   {String}      varName
 * @returns {Object|null}
 */
const getChildDeclarationByVarName = (ast, varName) => {
  const declarations = breadthSearchAllByType(ast, 'declaration');
  // Go through every of them to find the one that match with `varName`
  return declarations.reduce((acc, declaration) => {
    if (!acc) {
      const variationRef = findFirstNodeInDepth( declaration, ['property', 'variable', 'ident']);
      return (variationRef && variationRef.content === varName) ? declaration : acc;
    }
    return acc;
  }, null);
};

/**
 * Search in a SCSS abstract syntax tree (AST) the declarations of the given
 * name variable, and returns its assigned values
 * Eg:
 *  For `$color-grades: dark, base, soft, light;` with varName = `color-grades`,
 *  returns [dark, base, soft, light]
 *
 * @param   {Object}  ast
 * @param   {String}  varName
 * @returns {Array}
 */
const getVariantNames = (ast, varName) => {
  // Search of the "declarations in the file root"
  const declaration = getChildDeclarationByVarName(ast, varName);
  let values = [];
  // Get the declaration assigned values
  if (declaration) {
    const valueNode = breadthSearchFirstByType(declaration, 'value');
    const identNodes = breadthSearchAllByType(valueNode, 'ident');
    values = identNodes.map(n => n.content);
  }
  return values;
};

/**
 * Search in a AST the defined colors, and return an object with all their
 * variants and their values. `variantNames` filter the allowed variants.
 *
 * @param   {Object}    ast
 * @param   {Array}     variantNames
 * @returns {Object}
 */
const getColorsValues = (ast, variantNames) => {
  const declarations = breadthSearchAllByType(ast, 'declaration');
  const colors = declarations.reduce((acc, declaration) => {
    const lastPropertyNode = findFirstNodeInDepth(declaration, ['property', 'variable', 'ident']);
    const colorName = lastPropertyNode.content;

    const colorValues = findFirstNodeInDepth(declaration, ['value', 'parentheses']);
    const colorVariantNodes = breadthSearchAllByType(colorValues, 'ident');
    const colorVariantValueNodes = breadthSearchAllByType(colorValues, 'color');
    const colorVariants = colorVariantNodes.map(node => node.content);
    const colorVariantValues = colorVariantValueNodes.map(node => node.content);

    const colorValue = colorVariants.reduce((a, variant, i) => {
      if (variantNames.includes(variant)) {
        return {...a, [variant]: colorVariantValues[i]};
      }
      return a;
    }, {});

    return {...acc, [colorName]: colorValue};
  }, {});

  return colors;
};

/**
 * Search for a class ruleset with a defined name/className/varName
 *
 * @param   {Object}  ast
 * @param   {String}  varName
 * @returns {Object}
 */
const getChildRulesetByVarName = (ast, varName) => {
  const ruleset = breadthSearchAllByType(ast, 'ruleset');
  // Go through every of them to find the one that match with `varName`
  return ruleset.reduce((acc, rule) => {
    if (!acc) {
      const classVar = findFirstNodeInDepth( rule, ['selector', 'simpleSelector', 'class', 'ident']);
      return (classVar && classVar.content === varName) ? rule : acc;
    }
    return acc;
  }, null);
};

/**
 * Get from an AST, the value of a `ruleset` named as `varName`
 * @param   {Object}  ast
 * @param   {String}  varName
 * @returns {Object}
 */
const getClassDeclarationContent = (ast, varName) => {
  const rule = getChildRulesetByVarName(ast, varName);
  const value = findFirstNodeInDepth( rule, ['block', 'declaration', 'value', 'string']);
  const clearContent = value.content.substr(1, value.content.length - 2);
  return JSON.parse(clearContent);
};

module.exports = {
  getVariantNames,
  getColorsValues,
  getClassDeclarationContent,
};
