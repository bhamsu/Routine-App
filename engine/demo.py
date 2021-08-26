
# Importing Modules
import sys
# import demoClass as dC

class SampleCode() :
    """ Sample Class to take argument, and printing with some modefications. """

    def __init__(self, str) :
        self.str = str

    def PrintFunction(self) :
        return "Hello Brother, " + self.str

    def __del__(self) :
        pass

if __name__ == "__main__" :

    # Arguments from the JavaScript File
    arguments = sys.argv[1]
    # arguments = "Baba Ramdev"
    # Creating Object the Defied Class
    obj = SampleCode(arguments)

    # Calling the methods inside the Class using the above object
    print(obj.PrintFunction())
    sys.stdout.flush()
