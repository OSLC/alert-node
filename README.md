# node-red-contrib-alert-node

A node that creates an RTC Alert when the node is executed.

## Installation

Install `node-red-constrib-rtc-alert-node` using [npm](https://www.npmjs.com/):

```bash
npm install --save node-red-contrib-rtc-alert-node
```

## Usage

To use the node, launch Node-RED (see [running Node-RED](http://nodered.org/docs/getting-started/running.html) for help getting started), and add an alert node to your flow. The alert node does not perform any calculations in order to determine if the alert should be raised. You would typically use function and switch nodes in the flow to determine if the alert should be created or not. 

Note: At this time, the alert node does not use any of its input values. Future versions may utilize the Node-RED rich text input for the Description configuration, and support embedded variables in order to include node inputs in the description. 

Configure the node with the following information

* **Name**: the name of the node, should indicate something about the condition that raises the alert
* **RTC Server**: the URI of the RTC server that will be used to create the alert, for example: https://acme.com:9443/ccm
* **Project area**: the name of the RTC project are in which the Alert should be created
* **User ID**: the ID of an RTC user who is a member of the project area with sufficient privileges to create a work item
* **Password**: the RTC user's password (which is obscured)
* **Title**: the title of the Alert work item to create
* **Description**: the description of the work item to create

The RTC project area must be configured with a work item type how ID ends in 'alert'. See the [RTC documentation](https://www.ibm.com/support/knowledgecenter/SSCP65_6.0.5/com.ibm.jazz.platform.doc/topics/c_administering_projects.html) for information on how to create a custom work item.

When the alert node executes, an alert work item type is created in the given RTC project area with the configured title and description. The output of the node is one of:

* the URI of the created work item, or
* a message indicating a work item with that title already exists, and the URI of the existing work item

As you can see from the alert node output, the alert node will only create the alert work item if it does not already exist (based on matching the title).

## Contributors

Contributors:

* Jim Amsden (IBM)

## License

Licensed under the [Eclipse Public License](./LICENSE.html).

