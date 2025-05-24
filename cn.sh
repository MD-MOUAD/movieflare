#!/bin/bash

# cn.sh - This script install shadcn-ui@2.3.0 components
# Usage: ./cn.sh <component1> <component2> <component3>...

if [ $# -eq 0 ]; then
    echo "Error: Please specify at least one component name"
    echo "Example: ./cn.sh button table dropdown-menu"
    exit 1
fi

# Install each component
for COMPONENT in "$@"; do
    echo "Installing $COMPONENT..."
    npx shadcn@2.3.0 add "$COMPONENT"
    
    # Add spacing between components
    echo -e "\n--------------------------------\n"
done

echo "All components installed successfully!"