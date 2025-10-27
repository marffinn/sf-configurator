ETICS Fastener Configurator

This project is a web-based configurator designed to help users select the correct construction fasteners for External Thermal Insulation Composite Systems (ETICS). It provides an intuitive, step-by-step wizard to guide users through the necessary parameters and instantly receive technically accurate fastener recommendations.
What It Does

The primary goal of this application is to simplify the complex process of choosing the right ETICS fastener. By providing a few key details about their project, users can be confident they are getting a recommendation that is both safe and cost-effective.
Key Features

    Step-by-Step Wizard: The application guides the user through a series of simple questions to gather all the necessary project data.

    Detailed Input Parameters: The calculation is based on the following user-provided inputs:

        Substrate (Rodzaj podłoża): The type of wall material (e.g., Concrete, Brick, Aerated Concrete).

        Insulation Type (Typ izolacji): The material being fastened (e.g., Styrofoam or Mineral Wool).

        Insulation Thickness (Grubość izolacji): The thickness of the insulation material in centimeters.

        Adhesive Thickness (Grubość warstwy kleju): The thickness of the adhesive layer.

        Recessed Mounting (Montaż zagłębiony): Whether the fastener will be installed flush or recessed into the insulation.

Intelligent Calculation Logic

The configurator's core is a powerful calculation engine that uses embedded technical data to provide accurate recommendations.

    Dynamic Anchorage Depth (hef): The application uses the correct effective anchorage depth (hef) based on the selected substrate, referencing technical data sheets for accuracy.

    Mounting Type Logic: It correctly adjusts the required fastener length based on whether recessed mounting is selected, which can make shorter fasteners viable.

    Material Compatibility: The engine automatically filters fasteners based on technical requirements, such as only recommending fasteners with a metal pin for use with mineral wool.

    Accurate Length Calculation: It calculates the minimum required fastener length by combining insulation thickness, adhesive thickness, anchorage depth, and a tolerance value, then suggests the next available size in the product line.

Clear Recommendations

After completing the steps, the user is presented with a clear summary of their inputs and a table of recommended fasteners.

    Detailed Results: For each valid product, the table displays:

        Product Name (Nazwa)

        Recommended Length in mm (Długość)

        Effective Anchorage Depth for the substrate in mm (hef)

        Material (Materiał)

    Helpful Fallback: If no product in the database meets the user's specific (and often extreme) requirements, a message is displayed prompting them to contact the company's technical support for a custom solution.

Technology

This is a fully client-side application built with modern web technologies:

    React: For the user interface and state management.

    Material-UI (MUI): For a clean, responsive, and professional UI component library.

