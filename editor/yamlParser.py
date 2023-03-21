import yaml


def parseYAML(yamlString):
    # Parse the YAML string
    data = yaml.safe_load(yamlString)

    # Get the base dictionary
    base = data.get('base', {})

    # Set default values if necessary
    base.setdefault('material', 'IRON_HELMET')
    base.setdefault('name', '<gradient:#21a200:#20e800>§lCasque du Marcheur de Sang')
    base.setdefault('max-health', 14)
    base.setdefault('defense', 10)
    base.setdefault('unbreakable', True)
    base.setdefault('gem-sockets', [])

    # Get the options dictionary
    options = data.get('option', {})

    # Set default values if necessary
    options.setdefault('roll-modifier-check-order', True)
    options.setdefault('tiered', True)

    # Get the name
    name = next(iter(data))

    # Return the base and options dictionaries
    return name, base, options
