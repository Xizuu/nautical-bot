export interface DataConfig {
    version: Version;
    vote: Vote;
    blacklist: Vote;
    ip: Ip;
}

interface Ip {
    content: string;
}

interface Vote {
    messageId: string;
    content: string;
}

interface Version {
    bedrock: string;
    java: string;
}

const defaultData: DataConfig = {
    version: {
        bedrock: "1.20.80-1.21.0",
        java: "1.18-1.21.x",
    },
    vote: {
        messageId: "",
        content: "",
    },
    blacklist: {
        messageId: "",
        content: "",
    },
    ip: {
        content: "play.nauticalmc.xyz",
    },
};

export const readMessages = async () => {
    const file = Bun.file(Bun.pathToFileURL("data/messages.json"));

    if (!(await file.exists())) {
        throw new Error("The data file does not exist.");
    }

    const data: DataConfig = await file.json();

    return data;
};

export const updateVersion = async (bedrock: string, java: string) => {
    const file = Bun.file(Bun.pathToFileURL("data/messages.json"));

    if (!(await file.exists())) {
        throw new Error("The packagedata file does not exist.");
    }

    const data: DataConfig = await file.json();

    const config = {
        ...data,
        version: {
            bedrock,
            java,
        },
    };

    await Bun.write(Bun.file(Bun.pathToFileURL("data/messages.json")), JSON.stringify(config, null, 4));
};

export const updateVoteMessage = async (messageId: string) => {
    const file = Bun.file(Bun.pathToFileURL("data/messages.json"));

    if (!(await file.exists())) {
        throw new Error("The data file does not exist.");
    }

    const data: DataConfig = await file.json();

    const config = {
        ...data,
        vote: {
            messageId,
        },
    };

    await Bun.write(Bun.file(Bun.pathToFileURL("data/messages.json")), JSON.stringify(config, null, 4));
};

export const updateBlacklistMessage = async (messageId: string) => {
    const file = Bun.file(Bun.pathToFileURL("data/messages.json"));

    if (!(await file.exists())) {
        throw new Error("The data file does not exist.");
    }

    const data: DataConfig = await file.json();

    const config = {
        ...data,
        blacklist: {
            messageId,
        },
    };

    await Bun.write(Bun.file(Bun.pathToFileURL("data/messages.json")), JSON.stringify(config, null, 4));
};

export const updateIp = async (content: string) => {
    const file = Bun.file(Bun.pathToFileURL("data/messages.json"));

    if (!(await file.exists())) {
        throw new Error("The data file does not exist.");
    }

    const data: DataConfig = await file.json();

    const config = {
        ...data,
        ip: {
            content,
        },
    };

    await Bun.write(Bun.file(Bun.pathToFileURL("data/messages.json")), JSON.stringify(config, null, 4));
};

export const resetData = async () => {
    await Bun.write(Bun.file(Bun.pathToFileURL("data/messages.json")), JSON.stringify(defaultData, null, 4));
};
