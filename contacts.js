const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    console.log("The list of contacts: ", JSON.parse(contacts));
  } catch (error) {
    console.error(
      `Error occurred while reading contacts file: ${error.message}`
    );
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const contact = parsedContacts.find(
      (contact) => contact.id === String(contactId)
    );
    if (!contact) {
      console.log(`Contact with id ${contactId} not found`);
      return;
    }
    console.log(contact);
  } catch (error) {
    console.error(
      `Error occurred while reading contacts file: ${error.message}`
    );
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const updatedContacts = parsedContacts.filter(
      (contact) => contact.id !== String(contactId)
    );
    if (parsedContacts.length === updatedContacts.length) {
      console.log(`Contact with id ${contactId} not found`);
      return;
    }
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    console.log(`Contact with id ${contactId} removed successfully`);
  } catch (error) {
    console.error(
      `Error occurred while removing contact with id ${contactId}: ${error.message}`
    );
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const newContact = {
      id: String(parsedContacts.length + 1),
      name,
      email,
      phone,
    };
    parsedContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts));
    console.log(`New contact was added successfully`);
  } catch (error) {
    console.error(`Error occurred while adding new contact: ${error.message}`);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
